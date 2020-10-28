import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetUps: [
      // { id:1, desc:'Meet us in New York', location:'New York' , date:new Date(), title:"Meet up in New York", imgUrl:"https://cdn.vox-cdn.com/thumbor/kPW-T-fRW089pshIztZCHOWrCXU=/0x0:2800x1874/1200x800/filters:focal(1195x378:1643x826)/cdn.vox-cdn.com/uploads/chorus_image/image/64043139/shutterstock_240592135.0.jpg" },
      // { id:2, desc:'Meet us in Las Vegas', location:'Las Vegas' , date:new Date(), title:"Meet up in Las Vegas", imgUrl:"https://cf.bstatic.com/images/hotel/max1024x768/263/263858373.jpg" },
      // { id:3, desc:'Meet us in Miami', location:'Miami' , date:new Date(), title:"Meet up in Miami", imgUrl:"https://media.timeout.com/images/105617718/image.jpg" },
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForMeetUps(state, payload){
      const id = payload.id
      if (state.user.registeredMeetUps.findIndex(meetupId=> meetupId === id ) >= 0){ // return if meetupId already exist in array
        return
      }
      state.user.registeredMeetUps.push(id)
      state.user.fbKeys[id] = payload.fbKey // fbKey is registrationId
    },
    unregisterUserForMeetUps(state, payload){
      const registeredMeetUps = state.user.registeredMeetUps
      registeredMeetUps.splice(state.user.registeredMeetUps.findIndex(meetupId=> meetupId === payload ),1 )
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedMeetUps(state, payload){
      state.loadedMeetUps = payload
    },
    createMeetup(state, payload){
      state.loadedMeetUps.push(payload)
    },
    updateMeetup(state, payload){
      const meetup = state.loadedMeetUps.find((meetup)=>{
        return meetup.id == payload.id
      })
      if (payload.title){
        meetup.title = payload.title
      }
      if (payload.desc){
        meetup.desc = payload.desc
      }
      if (payload.location){
        meetup.location = payload.location
      }
      if (payload.date){
        meetup.date = payload.date
      }
    },
    setUser(state, payload){
      state.user = payload
    },
    setLoading(state,payload){
      state.loading = payload
    },
    setError(state, payload){
      state.error = payload
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    registerUserForMeetUps({commit, getters}, payload){ // meetupId
      commit('setLoading', true)
      firebase.database().ref('/users/'+ getters.user.id).child('/registrations/')
        .push(payload)
        .then(data=>{
          commit('setLoading', false)
          commit('registerUserForMeetUps', { id: payload, fbKey: data.key})
        })
        .catch(error=>{
          commit('setLoading', false)
          console.log(error)
        })
    },
    unregisterUserForMeetUps({commit, getters}, payload){ // meetupId
      commit('setLoading', true)
      if (!getters.user.fbKeys) {
        return
      }
      const fbKey = getters.user.fbKeys[payload]
      firebase.database().ref('/users/'+ getters.user.id + '/registrations/').child(fbKey)
        .remove()
        .then(()=>{
          commit('setLoading', false)
          commit('unregisterUserForMeetUps', payload)
        })
        .catch(error=>{
          commit('setLoading', false)
          console.log(error)
        })
    },
    loadedMeetUps({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data=>{
          commit('setLoading', false)
          const meetups = []
          const obj = data.val()
          for (let key in obj){
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              desc: obj[key].desc,
              imgUrl: obj[key].imgUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetUps', meetups)
        })
        .catch(error=>{
          console.log(error)
        })
    },
    updateMeetup({commit},payload){
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title){
        updateObj.title = payload.title
      }
      if (payload.desc){
        updateObj.desc = payload.desc
      }
      if (payload.location){
        updateObj.location = payload.location
      }
      if (payload.date){
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(()=>{
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error=>{
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup({commit, getters}, payload){
      const meetup = {
        title: payload.title,
        location: payload.location,
        desc: payload.desc,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl = ''
      let key = ''
      firebase.database().ref('meetups').push(meetup)
        .then(resp=>{
          key = resp.key
          return key
        })
        .then(key =>{
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/'+ key + ext ).put(payload.image)
        })
        .then(fileData=>{
          return firebase.storage().ref().child(fileData.metadata.fullPath).getDownloadURL()
        })
        .then((url)=> {
          imageUrl = url
          return firebase.database().ref('meetups').child(key).update({imgUrl : imageUrl})
        })
        .then(()=>{
          commit('createMeetup', {
            ...meetup,
            id: key,
            imgUrl: imageUrl
          }) // store in firebase
        })
        .catch(error => {
          console.log(error)
        })
    },
    signUserUp({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(resp => {
          const newUser = {
            id: resp.user.uid,
            registeredMeetUps: [],
            fbKeys: {}
          }
          commit('setUser', newUser) 
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    signUserIn({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(resp => {
          commit('setLoading', false)
          const newUser = {
            id: resp.user.uid,
            registeredMeetUps: [],
            fbKeys: {}
          }
          commit('setUser', newUser) 
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    autoSignin({commit}, payload){
      commit('setUser', {
        id : payload.uid, 
        registeredMeetUps : [],
        fbKeys: {}
      })
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError({commit}){
      commit('clearError')
    }
  },
  modules: {
  },
  getters: {
    loadedMeetUps (state){
      return state.loadedMeetUps.sort((a,b)=>{
        return a.date > b.date
      })
    },
    featuredMeetUps (state, getters) {
      return getters.loadedMeetUps.slice(0,3)
    },
    loadedMeetUp (state) {
      return (id)=>{
        return state.loadedMeetUps.find((meetup)=>{
          return meetup.id == id
        })
      }
    },
    user (state) {
      return state.user // retrieve user from state
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
