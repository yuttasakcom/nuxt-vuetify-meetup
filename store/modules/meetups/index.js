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
