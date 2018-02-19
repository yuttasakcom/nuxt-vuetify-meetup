<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>

              <v-flex xs5 sm4 md3>
                <v-card-media src="https://www.ediblemanhattan.com/wp-content/uploads/2016/04/header-new-york.jpg" height="130px">
                </v-card-media>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 white--text">My Meetup</h3>
                    <div>17th July 2017</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/meetups/1"><v-icon left light>arrow_forward</v-icon> View Meetup</v-btn>
                </v-card-actions>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>