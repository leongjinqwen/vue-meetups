import store from "../store"

// to redirect user to login page if found no login user
export default (to, from, next) => {
  if (store.getters.user){
    next()
  } else {
    next('/sessions/new')
  }
}