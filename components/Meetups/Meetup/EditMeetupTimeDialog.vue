<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn accent slot="activator">
            Edit Time
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="red--text"><h3>Edit Meetup Time</h3></v-card-title>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker color="red" v-model="editableTime" style="width: 100%" actions format="24hr">
                            <template>
                                <v-btn class="red--text" flat @click.native="editDialog = false">Close</v-btn>
                                <v-btn class="red--text" flat @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)

      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: newDate
      })

      this.editDialog = false
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date)
  }
}
</script>
