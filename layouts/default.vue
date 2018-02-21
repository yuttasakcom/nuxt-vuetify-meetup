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

        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="red">
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
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
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
      drawer: false
    }
  },
  computed: {
    menuItems() {
      let items = [
        { icon: 'face', title: 'Sign up', to: '/users/signup' },
        { icon: 'lock_open', title: 'Sign in', to: '/users/signin' }
      ]

      if (this.userIsAuthenticated) {
        items = [
          { icon: 'supervisor_account', title: 'View Meetups', to: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', to: '/meetup/new' },
          { icon: 'person', title: 'Profile', to: '/users/profile' }
        ]
      }
      return items
    },
    userIsAuthenticated() {
      return this.$store.getters.userIsAuthenticated
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.replace('/')
    }
  }
}
</script>
