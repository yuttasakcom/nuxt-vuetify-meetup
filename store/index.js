import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import meetup from './meetup'
import user from './user'
import shared from './shared'

const createStore = () =>
  new Vuex.Store({
    modules: {
      meetup,
      user,
      shared
    }
  })

export default createStore
