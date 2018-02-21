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
    },
    registerMeetup(state, payload) {
      const id = payload.id
      const registeredMeetups = state.user.registeredMeetups.findIndex(
        meetup => meetup.id === id
      )

      if (registeredMeetups >= 0) {
        return
      }

      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === payload),
        1
      )
      Reflect.deleteProperty(state.user.fbKeys, payload)
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
    fetchUserData({ commit, getters }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref(`/users/${getters.user.id}/registrations/`)
        .once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredMeetups = []
          let swappedPairs = {}

          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }

          const updateUser = {
            id: getters.user.id,
            registeredMeetups,
            fbKeys: swappedPairs
          }

          commit('setLoading', false)
          commit('setUser', updateUser)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    registerMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase
        .database()
        .ref(`/users/${user.id}`)
        .child('/registrations')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerMeetup', {
            id: payload,
            fbKey: data.key
          })
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    unregisterMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase
        .database()
        .ref(`/users/${user.id}/registrations`)
        .child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterMeetup', payload)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
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
