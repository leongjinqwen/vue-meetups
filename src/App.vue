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


<style>
/* css for loader */
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>