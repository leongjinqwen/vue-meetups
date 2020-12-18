import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import SignUp from '@/views/User/SignUp'
import SignIn from '@/views/User/SignIn'
import MeetUps from '@/views/MeetUp/MeetUps'
import MeetUp from '@/views/MeetUp/MeetUp'
import CreateMeetUp from '@/views/MeetUp/CreateMeetUp'
import AuthGuard from './auth-guard'
// @ is an alias to /src

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Show Meet Up',
    component: MeetUps
  },
  {
    path: '/meetups/new',
    name: 'Create Meet Up',
    component: CreateMeetUp,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetups/:id',
    name: 'Meet Up',
    props: true,
    component: MeetUp
  },
  {
    path: '/users/new',
    name: 'Sign Up',
    component: SignUp
  },
  {
    path: '/sessions/new',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User/Profile.vue'),
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  routes,
  mode: "hash",
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  document.title = "Meetify | " + to.name ;
  next()
})

export default router
