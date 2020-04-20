import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vue2TouchEvents from 'vue2-touch-events'
import VueAnalytics from 'vue-analytics'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(VueAnalytics, {
  id: 'UA-98792383-4',
  router
})
Vue.use(Vue2TouchEvents)
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
