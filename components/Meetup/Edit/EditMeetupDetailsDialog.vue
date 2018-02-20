<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="red--text"><h3>Edit Meetup Detail</h3></v-card-title>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                required
                                v-model="editTitle"
                            ></v-text-field>
                        

                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                multi-line
                                required
                                v-model="editDescription"
                            ></v-text-field>

                        </v-card-text>

                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="red--text" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="red--text" @click="onSaveChange">Save</v-btn>
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
    meetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
      editTitle: this.meetup.title,
      editDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChange() {
      if (this.editTitle.trim() === '' || this.editDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        title: this.editTitle,
        description: this.editDescription
      })
    }
  }
}
</script>

