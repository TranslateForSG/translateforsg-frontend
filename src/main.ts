import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vue2TouchEvents from 'vue2-touch-events'
import VueAnalytics from 'vue-analytics'
import '@mdi/font/css/materialdesignicons.min.css'
import store from './store'
import vueDebounce from 'vue-debounce'

import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new VueIntegration({Vue, attachProps: true})],
  });
}

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_ID,
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

Vue.use(vueDebounce, {
  listenTo: ['keyup']
});

Vue.use(Vue2TouchEvents)
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
