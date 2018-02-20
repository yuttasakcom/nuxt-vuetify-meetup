<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn accent slot="activator">
            Edit Date
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="red--text"><h3>Edit Meetup Date</h3></v-card-title>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker color="red" v-model="editableDate" style="width: 100%" actions>
                            <template>
                                <v-btn class="red--text" flat @click.native="editDialog = false">Close</v-btn>
                                <v-btn class="red--text" flat @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getMonth()
      const newYear = new Date(this.editableDate).getFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setFullYear(newYear)

      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: newDate
      })

      this.editDialog = false
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.date)
      .toLocaleDateString('en-au')
      .split('/')
      .reverse()
      .join('-')
  }
}
</script>
