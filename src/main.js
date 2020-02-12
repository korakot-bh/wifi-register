import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
// import getmac from 'getmac'
import ClientJS from 'clientjs'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCookies from 'vue-cookies'
// import macaddress from 'node-macaddress'


Vue.config.productionTip = false
Vue.use(ClientJS)
Vue.use(VueAxios,axios)
Vue.use(VueCookies)
Vue.use(VueSweetalert2)
// Vue.use(macaddress)

new Vue({
  router,
  render: h => h(App),
  methods: {
    redirecTo (destination) {
      router.push(destination)
    }
  }
}).$mount('#app')
