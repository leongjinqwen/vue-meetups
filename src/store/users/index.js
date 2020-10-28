import * as firebase from 'firebase'

export default {
  state: {
    user: null,
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
    setUser(state, payload){
      state.user = payload
    },
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
    fetchUserData({commit, getters}){
      commit('setLoading', true)
      firebase.database().ref('/users/'+ getters.user.id + '/registrations/').once('value')
        .then(data=>{
          commit('setLoading', false)
          const values = data.val() // { registrationId: meetupId }
          let registeredMeetUps = [] // a list of meetupId => values[key]
          let swappedPairs = {} // { meetupId: registrationId } => to set as fbKeys
          for (let key in values){
            registeredMeetUps.push(values[key])
            swappedPairs[values[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetUps: registeredMeetUps,
            fbKeys: swappedPairs
          }
          commit('setUser',updatedUser)
        })
        .catch(error=>{
          commit('setLoading', false)
          console.log(error)
        })
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
  },
  getters: {
    user (state) {
      return state.user // retrieve user from state
    },
  }
}
