<template>
  <v-container>

        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="red"
                v-if="loading" ></v-progress-circular>
            </v-flex>
        </v-layout>

      <v-layout row wrap v-else>
          <v-flex xs12>
              <v-card>

                  <v-card-title>
                      <h3 class="red--text">{{ meetup.title }}</h3>
                      <template v-if="userIsCreator">
                          <v-spacer></v-spacer>
                          <edit-meetup-detail-dialog :meetup="meetup"></edit-meetup-detail-dialog>
                      </template>
                  </v-card-title>

                  <v-card-media :src="meetup.imageUrl" height="400px">
                  </v-card-media>

                  <v-card-text>
                      <div class="info--text">
                          {{ meetup.date | date }} - {{ meetup.location }}
                            <div>
                                <edit-meetup-date-dialog
                                    :meetup="meetup"
                                    v-if="userIsCreator"></edit-meetup-date-dialog>

                                <edit-meetup-time-dialog
                                    :meetup="meetup"
                                    v-if="userIsCreator"></edit-meetup-time-dialog>
                            </div>
                      </div>
                      <div>{{ meetup.description }}</div>
                  </v-card-text>

                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <app-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.$route.params.id)
    },
    userIsAuthenticated() {
      return this.$store.getters.userIsAuthenticated
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false
      }

      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>
