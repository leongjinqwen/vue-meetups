<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-center text-sm-right">
        <v-btn large router to="/meetups" class="info mr-2">Explore meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-center text-sm-left">
        <v-btn large router to="/meetups/new" class="info ml-2">Organize meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="(item, i) in meetups" v-bind:src="item.imgUrl" :key="i" @click="onLoadMeetUp(item.id)">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{item.title}}</div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex class="text-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetUps
    }
  },
  methods: {
    onLoadMeetUp(id) {
      this.$router.push(`/meetups/${id}`)
    }
  }
}
</script>

<style scoped>
  .display-3 {
    background-color:rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 10px;
  }
</style>