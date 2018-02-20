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
              date: obj[key].date
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
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }

      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          console.log(data)
          commit('createMeetup', { ...meetup, id: data.key })
        })
        .catch(err => console.log(erro))
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
