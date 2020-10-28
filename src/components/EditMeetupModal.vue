<template>
  <v-dialog v-model="dialog" persistent max-width="340">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab outlined dark small color="primary" v-bind="attrs" v-on="on">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Edit Meetup</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 class="px-3">
            <v-text-field name="title" v-model="editedTitle" label="Title"></v-text-field>
            <v-text-field name="location" v-model="editedLocation" label="Location"></v-text-field>
            <v-text-field name="desc" v-model="editedDesc" label="Description"></v-text-field>
            <!-- date -->
            <v-menu ref="menuDate" v-model="menuDate" :close-on-content-click="false" :return-value.sync="editedDate" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="editedDate" label="Date" prepend-icon="mdi-calendar" v-bind="attrs" v-on="on" ></v-text-field>
              </template>
              <v-date-picker color="info" v-model="editedDate" no-title scrollable >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menuDate.save(editedDate)">Select</v-btn>
              </v-date-picker>
            </v-menu>
            <!-- time -->
            <v-menu ref="menuTime" v-model="menuTime" :nudge-right="40" :close-on-content-click="false" :return-value.sync="editedTime" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="editedTime" label="Time" prepend-icon="mdi-clock" v-bind="attrs" v-on="on" ></v-text-field>
              </template>
              <v-time-picker color="info" v-model="editedTime" @click:minute="$refs.menuTime.save(editedTime)"></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="dialog=false" >Cancel</v-btn>
        <v-btn color="green darken-1" text @click="onSaveChanges" >Edit Meetup</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        dialog: false,
        menuDate: false,
        menuTime: false,
        editedTitle: this.meetup.title,
        editedDesc: this.meetup.desc,
        editedLocation: this.meetup.location,
        editedDate: null,
        editedTime: null
      }
    },
    created() {
      this.editedDate = new Date(this.meetup.date).toISOString().substr(0, 10)
      this.editedTime = new Date(this.meetup.date).toLocaleTimeString().slice(0,5)
    },
    computed: {
      formatDate(){
        const date = new Date(this.meetup.date)

        let newDay = new Date(this.editedDate).getDate()
        const newMonth = new Date(this.editedDate).getMonth()
        const newYear = new Date(this.editedDate).getFullYear()

        const hours = this.editedTime.match(/^(\d+)/)[1]
        const minutes = this.editedTime.match(/:(\d+)/)[1]
        
        if (hours < 8){
          newDay++
        }
        date.setDate(newDay)
        date.setMonth(newMonth)
        date.setFullYear(newYear)

        console.log(hours)
        date.setHours(hours)
        date.setMinutes(minutes)
        return date
      }
    },
    methods: {
      onSaveChanges(){
        if (this.editedTitle.trim() === '' || this.editedDesc.trim() === '' || this.editedLocation.trim() === ''){
          return
        }
        this.dialog = false
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          title: this.editedTitle,
          location: this.editedLocation,
          desc: this.editedDesc,
          date: this.formatDate
        })
      }
    }
  }
</script>