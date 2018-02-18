<template>
  <v-app>

    <v-navigation-drawer
      temporary
      v-model="drawer"
      app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.to"
          >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="pink lighten-2">
      <v-toolbar-side-icon
        @click.native.stop="drawer = !drawer"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <nuxt-link to="/" tag="span" style="cursor:pointer">DevMeetup</nuxt-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.to">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    

     <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: 'supervisor_account', title: 'View Meetups', to: '/meetups' },
        { icon: 'room', title: 'Organize Meetup', to: '/meetups/new' },
        { icon: 'person', title: 'Profile', to: '/users/profile' },
        { icon: 'face', title: 'Sign up', to: '/users/signup' },
        { icon: 'lock_open', title: 'Sign in', to: '/users/signin' }
      ]
    }
  }
}
</script>
