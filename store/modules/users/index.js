import firebase from 'firebase'

function createNewAccount(user) {
  return firebase
    .database()
    .ref(`accounts/${user.uid}`)
    .set({
      displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
      email: user.email,
      image: user.newImage || '/images/default-profile.png' // supply a default profile image for all users
    })
}

export default {
  state: {
    user: {
      id: '1',
      registeredMeetups: ['aaaaa1']
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    signUserUp({ commit }, account) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(account.email, account.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registerdMeetups: []
          }
          commit('setUser', newUser)
          return createNewAccount(user)
        })
        .catch(err => console.log(err))
    }
  },
  getters: {}
}
