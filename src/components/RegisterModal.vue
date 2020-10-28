<template>
  <v-dialog v-model="dialog" persistent max-width="290" >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        {{ userIsRegistered ? 'Unregistered' : 'Register Now!'}}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline" v-if="userIsRegistered">Unregistered from Meetup?</v-card-title>
      <v-card-title class="headline" v-else>Register for Meetup?</v-card-title>
      <v-divider></v-divider>
      <v-card-text>You can always change your decision later on.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="dialog = false" >Cancel</v-btn>
        <v-btn color="green darken-1" text @click="onAgree" >Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
      userIsRegistered(){
        return this.$store.getters.user.registeredMeetUps.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      onAgree(){
        this.dialog = false
        if (this.userIsRegistered){
          this.$store.dispatch('unregisterUserForMeetUps', this.meetupId)
        }
        else {
          this.$store.dispatch('registerUserForMeetUps', this.meetupId)
        }
      }
    }
  }
</script>