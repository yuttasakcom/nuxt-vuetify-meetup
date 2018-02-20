import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', date => {
  moment.locale('th')
  return moment(date).format('LLL')
})
