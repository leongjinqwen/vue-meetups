<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create New Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                v-model="title"
                label="Title"
                id="title"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                v-model="location"
                label="Location"
                id="location"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                v-model="imageUrl"
                label="Image Url"
                id="image-url"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" width="100%">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="desc"
                v-model="desc"
                label="Description"
                id="desc"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose Date & Time</h4>
              <v-date-picker 
                color="success"
                header-color="success"
                v-model="date"
                elevation="15"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker 
                v-model="time"
                color="success"
                elevation="15"></v-time-picker>
            </v-flex>
          </v-layout>
          
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" class="primary" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        date: new Date().toISOString().substr(0, 10),
        time: new Date(),
        location: '',
        imageUrl: '',
        desc: '',
        rules: {
          required: value => !!value || 'Required.',
        },
      }
    },
    computed: {
      formIsValid(){
        return this.title !== '' && this.desc !== '' && this.location !== '' && this.imageUrl !== ''
      },
      formatDate(){
        const date = new Date(this.date)
        if (typeof this.time === 'string'){
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup() {
        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          desc: this.desc,
          date: this.formatDate
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      }
    }
  }
</script>