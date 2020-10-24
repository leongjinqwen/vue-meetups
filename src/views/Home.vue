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
        <v-carousel v-model="model">
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
  data(){
    return {
      meetups: [
        { id:1, title:"Meet up in New York", imgUrl:"https://cdn.vox-cdn.com/thumbor/kPW-T-fRW089pshIztZCHOWrCXU=/0x0:2800x1874/1200x800/filters:focal(1195x378:1643x826)/cdn.vox-cdn.com/uploads/chorus_image/image/64043139/shutterstock_240592135.0.jpg" },
        { id:2, title:"Meet up in Las Vegas", imgUrl:"https://cf.bstatic.com/images/hotel/max1024x768/263/263858373.jpg" },
        { id:3, title:"Meet up in Miami", imgUrl:"https://media.timeout.com/images/105617718/image.jpg" },
      ]
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