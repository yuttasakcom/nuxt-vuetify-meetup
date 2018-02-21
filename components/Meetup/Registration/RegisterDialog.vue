<template>
    <v-dialog width="350px" persistent v-model="registerDialog">
        <v-btn :color="userIsRegistered ? 'red' : 'green'" class="white--text" accent slot="activator">
            {{ userIsRegistered ? 'Unregister': 'Register' }}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="red--text" v-if="userIsRegistered"><h3>Unregister from Meetup?</h3></v-card-title>
                        <v-card-title class="red--text" v-else><h3>Register for Meetup?</h3></v-card-title>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>You can always change your decision later on.</v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn
                                class="red--text"
                                flat
                                @click="registerDialog = false"
                            >Cancel</v-btn>
                            <v-btn
                                class="green--text"
                                flat
                                @click="onAgree"
                            >Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    meetupId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered() {
      const registeredMeetup = this.$store.getters.user.registeredMeetups.findIndex(
        meetupId => meetupId === this.meetupId
      )

      return registeredMeetup >= 0
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerMeetup', this.meetupId)
      }
    }
  }
}
</script>
