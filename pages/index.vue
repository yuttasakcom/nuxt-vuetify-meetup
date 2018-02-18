<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="pink lighten-2" dark>Explore Meetups</v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetups" class="pink lighten-2" dark>Organize Meetup</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex xs12 class="text-xs-center">
       <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        {
          imageUrl:
            'https://www.ediblemanhattan.com/wp-content/uploads/2016/04/header-new-york.jpg',
          id: 'asdfdasf1',
          title: 'Meetup in New York'
        },
        {
          imageUrl:
            'https://www.thetimes.co.uk/travel/s3/growthtravel-prod/uploads/2017/12/Bangkok_skyline_getty-1500x792.jpg',
          id: 'asdfdasf2',
          title: 'Meetup in Bangkok'
        }
      ]
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
