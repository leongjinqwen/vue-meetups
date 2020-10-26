import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import DateFilter from './filters/date'
import AlertCmp from './components/Alert.vue'

Vue.config.productionTip = false
Vue.filter('date',DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created(){
    // initialize the app with firebase configuration
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID
    })
  }
}).$mount('#app')
