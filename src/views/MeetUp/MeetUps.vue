<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-auto mb-3" v-for="meetup in meetups" :key="meetup.id">
          <v-img :src="meetup.imgUrl" height="400px"></v-img>
          <v-card-title>{{meetup.title}}</v-card-title>
          <v-card-subtitle>{{meetup.date}}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" text :to="`/meetups/${meetup.id}`" >
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups() {
        return this.$store.getters.loadedMeetUps
      }
    }
  }
</script>