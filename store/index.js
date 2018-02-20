import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import meetups from './modules/meetups'
import users from './modules/users'

const createStore = () =>
  new Vuex.Store({
    modules: {
      meetups,
      users
    }
  })

export default createStore
