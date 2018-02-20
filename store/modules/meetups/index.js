import firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
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
    },
    registerMeetup(state, payload) {
      const id = payload.id
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
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
    loadedMeetups({ loadedMeetups }) {
      return loadedMeetups.sort((a, b) => {
        return a.date > b.date
      })
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup({ loadedMeetups }) {
      return meetupId => loadedMeetups.find(meetup => meetup.id === meetupId)
    }
  }
}
