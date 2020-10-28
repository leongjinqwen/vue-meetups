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
        editedTitle: this.meetup.title,
        editedDesc: this.meetup.desc,
        editedLocation: this.meetup.location,
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
          desc: this.editedDesc
        })
      }
    }
  }
</script>