import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App'
import router from './router'
import {store} from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(fas)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Notifications)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const vueApp = new Vue({
  store,
  router,
  render: h => h(App),
  mounted () {
      document.dispatchEvent(new Event('render-event'))
  }
})



vueApp.$mount('#app')
