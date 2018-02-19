import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () =>
  new Vuex.Store({
    state: {
      loadedMeetups: [
        {
          imageUrl:
            'https://www.ediblemanhattan.com/wp-content/uploads/2016/04/header-new-york.jpg',
          id: 'aaaaa1',
          title: 'Meetup in New York',
          date: '2017-07-17'
        },
        {
          imageUrl:
            'https://www.thetimes.co.uk/travel/s3/growthtravel-prod/uploads/2017/12/Bangkok_skyline_getty-1500x792.jpg',
          id: 'aaaaa2',
          title: 'Meetup in Bangkok',
          date: '2017-07-19'
        }
      ],
      user: {
        id: 'asdfds1',
        registeredMeetups: ['aaaaa1']
      }
    },
    mutations: {},
    actions: {},
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
  })

export default createStore
