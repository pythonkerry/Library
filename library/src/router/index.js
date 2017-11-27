import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../components/Index'
import BooksPage from '../components/Books'
import DetailsPage from '../components/Details'
import SeatsPage from '../components/Seats'
import RoomsPage from '../components/Rooms'
import MyInfoPage from '../components/MyInfo'
import N2StackPage from '../components/stackn2'
import S2StackPage from '../components/stacks2'
import N3StackPage from '../components/stackn3'
import S3StackPage from '../components/stacks3'
import RoomsTodayPage from '../components/roomstoday'
import RoomsTomorrowPage from '../components/roomstomorrow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Index',
      path: '/',
      component: IndexPage
    },
    {
      name: 'Books',
      path: '/books',
      component: BooksPage
    },
    {
      name: 'Details',
      path: '/details',
      component: DetailsPage
    },
    {
      name: 'Seats',
      path: '/seats',
      component: SeatsPage,
      redirect: '/seats/n2',
      children: [
        {
          path: 'n2',
          component: N2StackPage
		},
        {
          path: 's2',
          component: S2StackPage
		},
        {
          path: 'n3',
          component: N3StackPage
		},
        {
          path: 's3',
          component: S3StackPage
		}
      ]
    },
    {
      name: 'Rooms',
      path: '/rooms',
      component: RoomsPage,
      redirect: '/rooms/today',
      children: [
        {
          path: 'today',
          component: RoomsTodayPage
		},
        {
          path: 'tomorrow',
          component: RoomsTomorrowPage
		}
      ]
    },
    {
      name: 'MyInfo',
      path: '/myinfo',
      component: MyInfoPage
    }
  ]
})
