import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './components/page/LoginPage'
import Home from './components/page/Home'
import ManageUserPage from './components/page/ManageUserPage'
import ManagePage from './components/page/ManagePage'
import AdminManage from './components/page/AdminManage'
import LogPage from './components/page/LogPage'
import AdminDevice from './components/page/AdminDevice'



// import UserDeviceManage from './components/page/UserPage'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/manage_user',
      name: 'manage_user',
      component: ManageUserPage
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/Log',
      name: 'Log',
      component: LogPage
    },
    {
      path: '/AdminManage',
      name: 'AdminManage',
      component: AdminManage
    },
    {
      path: '/ManageDevice',
      name: 'ManageDevice',
      component: ManagePage
    },
    {
      path: '/AdminDevice',
      name: 'AdminDevice',
      component: AdminDevice
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
