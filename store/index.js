import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import meetup from './meetup'
import user from './user'

const createStore = () =>
  new Vuex.Store({
    modules: {
      meetup,
      user
    }
  })

export default createStore
