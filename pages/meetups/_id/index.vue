<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>

                  <v-card-title>
                      <h3 class="red--text">{{ meetup.title }}</h3>
                  </v-card-title>

                  <v-card-media :src="meetup.imageUrl" height="400px">
                  </v-card-media>

                  <v-card-text>
                      <div class="info--text">
                          {{ meetup.date }} - Where it takes place
                      </div>
                      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, consequuntur accusantium nemo cumque libero sit? Sapiente accusamus vero dolor atque?</div>
                  </v-card-text>

                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="red white--text">Register</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.$route.params.id)
    }
  }
}
</script>
