<template>
  <div class="about">
    <!-- show registered meetups -->
    <h1>Registered Meetups</h1>
    <v-container fluid>
      <v-row dense>
        <v-col 
          v-for="meetup in registeredMeetups" 
          :key="meetup.id"
          :cols="4"
        >
          <v-card class="mx-auto mb-3">
            <v-img :src="meetup.imgUrl" height="400px"></v-img>
            <v-card-title>{{meetup.title}}</v-card-title>
            <v-card-subtitle>{{meetup.date | date}}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" text :to="`/meetups/${meetup.id}`" >
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
  export default {
    computed: {
      registeredMeetups() {
        return this.$store.getters.loadedMeetUps.filter(meetup=>this.$store.getters.user.registeredMeetUps.includes(meetup.id))
      }
    }
  }
</script>