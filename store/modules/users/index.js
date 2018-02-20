import firebase from 'firebase'
// function createNewAccount(user) {
//   return firebase
//     .database()
//     .ref(`accounts/${user.uid}`)
//     .set({
//       displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
//       email: user.email,
//       image: user.newImage || '/images/default-profile.png' // supply a default profile image for all users
//     })
// }

export default {
  state: {
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state, payload) {
      state.error = null
    }
  },
  actions: {
    signUserUp({ commit }, account) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(account.email, account.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
          // return createNewAccount(user)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    signUserIn({ commit }, account) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(account.email, account.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    setLoading({ commit }, payload) {
      commit('setLoading', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user({ user }) {
      return user
    },
    loading({ loading }) {
      return loading
    },
    error({ error }) {
      return error
    },
    userIsAuthenticated({ user }) {
      return user !== null && user !== undefined
    }
  }
}
