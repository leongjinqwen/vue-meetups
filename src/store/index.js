import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetUps: [
      { id:1, desc:'Meet us in New York', location:'New York' , date:new Date(), title:"Meet up in New York", imgUrl:"https://cdn.vox-cdn.com/thumbor/kPW-T-fRW089pshIztZCHOWrCXU=/0x0:2800x1874/1200x800/filters:focal(1195x378:1643x826)/cdn.vox-cdn.com/uploads/chorus_image/image/64043139/shutterstock_240592135.0.jpg" },
      { id:2, desc:'Meet us in Las Vegas', location:'Las Vegas' , date:new Date(), title:"Meet up in Las Vegas", imgUrl:"https://cf.bstatic.com/images/hotel/max1024x768/263/263858373.jpg" },
      { id:3, desc:'Meet us in Miami', location:'Miami' , date:new Date(), title:"Meet up in Miami", imgUrl:"https://media.timeout.com/images/105617718/image.jpg" },
    ],
    user: {
      id: 1,
      registeredMeetUps: [ 2 ]
    }
  },
  mutations: {
    createMeetup(state, payload){
      state.loadedMeetUps.push(payload)
    }
  },
  actions: {
    createMeetup({commit}, payload){
      const meetup = {
        id: 4,
        title: payload.title,
        location: payload.location,
        desc: payload.desc,
        imgUrl: payload.imageUrl,
        date: payload.date
      }
      // store in firebase
      commit('createMeetup', meetup)
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
    }
  }
})
