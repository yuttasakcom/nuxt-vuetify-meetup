import Vue from 'vue'

import Alert from '@/components/UI/Alert'
import EditMeetupDetailsDialog from '@/components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from '@/components/Meetup/Edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from '@/components/Meetup/Edit/EditMeetupTimeDialog'

Vue.component('Alert', Alert)
Vue.component('edit-meetup-detail-dialog', EditMeetupDetailsDialog)
Vue.component('edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('edit-meetup-time-dialog', EditMeetupTimeDialog)
