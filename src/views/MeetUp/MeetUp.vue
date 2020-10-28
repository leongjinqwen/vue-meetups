<template>
  <v-container>
    <!-- loader -->
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-center mt-3">
        <v-progress-circular indeterminate color="primary" :width="8" :size="100" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card class="mx-auto">
          <v-card-title>
            <h5>{{meetup.title}}</h5>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-modal :meetup="meetup"></app-edit-meetup-modal>
            </template>
          </v-card-title>
          <v-img class="white--text align-end" :src="meetup.imgUrl" height="400px">
          </v-img>
          <v-card-subtitle class="pb-0 info--text">{{ meetup.date | date }} - {{meetup.location}}</v-card-subtitle>
          <v-card-text>
            <div>{{meetup.desc}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-modal :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-register-modal>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetUp(this.id)
      },
      loading() {
        return this.$store.getters.loading
      },
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator(){
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      }
    },
  }
</script>