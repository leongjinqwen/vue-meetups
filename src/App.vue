<template>
  <v-app> 
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar'

  export default {
    data() {
      return {
       
      }
    },
    components: {Navbar}
  }
</script>


