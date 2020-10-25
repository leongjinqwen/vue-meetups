<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-auto">
          <v-img class="white--text align-end" :src="meetup.imgUrl" height="400px">
            <v-card-title>{{meetup.title}}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0 info--text">{{meetup.date}} - Location</v-card-subtitle>
          <v-card-text>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptates, minima mollitia quis nobis itaque neque. Eveniet perferendis minus ducimus ab ut molestias blanditiis aliquam nisi dolor, autem suscipit illo.</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>
              Register Now!
            </v-btn>
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
      }
    },
  }
</script>