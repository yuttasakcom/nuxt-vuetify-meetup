import firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [],
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state, payload) {
      state.error = null
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setLoadedMeetups(state, meetups) {
      state.loadedMeetups = meetups
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(
        meetup => meetup.id === payload.id
      )

      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    nuxtServerInit(vuexContext, context) {
      return firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()

          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }

          vuexContext.commit('setLoadedMeetups', meetups)
          vuexContext.commit('setLoading', false)
        })
        .catch(err => {
          console.log(err)
          vuexContext.commit('setLoading', true)
        })
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }

      let imageUrl
      let key

      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase
            .storage()
            .ref(`meetups/${key}/.${ext}`)
            .put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createMeetup', { ...meetup, id: key, imageUrl: imageUrl })
        })
        .catch(err => console.log(error))
    },
    updateMeetup({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }

      if (payload.description) {
        updateObj.description = payload.description
      }

      if (payload.date) {
        updateObj.date = payload.date
      }

      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    setLoading({ commit }, payload) {
      commit('setLoading', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetup({ loadedMeetups }) {
      return meetupId => loadedMeetups.find(meetup => meetup.id === meetupId)
    },
    loadedMeetups({ loadedMeetups }) {
      return loadedMeetups.sort((a, b) => {
        return a.date > b.date
      })
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loading({ loading }) {
      return loading
    },
    error({ error }) {
      return error
    }
  }
}
