import Vue from 'vue'
import Vuex from 'vuex'
import meetups from './meetups'
import users from './users'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetups: meetups,
    users: users,
    shared: shared,
  }
})
