<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-auto" max-width="344">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
          <v-card-title>Title</v-card-title>
          <v-card-subtitle>Date</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" text to="/meetups/1" >
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
