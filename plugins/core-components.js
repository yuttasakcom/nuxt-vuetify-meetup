import Vue from 'vue'

import Alert from '@/components/UI/Alert'
import EditMeetupDetailsDialog from '@/components/Meetups/Meetup/EditMeetupDetailsDialog'
import EditMeetupDateDialog from '@/components/Meetups/Meetup/EditMeetupDateDialog'
import EditMeetupTimeDialog from '@/components/Meetups/Meetup/EditMeetupTimeDialog'

Vue.component('Alert', Alert)
Vue.component('edit-meetup-detail-dialog', EditMeetupDetailsDialog)
Vue.component('edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('edit-meetup-time-dialog', EditMeetupTimeDialog)
