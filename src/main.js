import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import './plugins/vue-the-mask'
import './plugins/vue-moment'
import './plugins/vee-validate'
import './plugins/v-currency-field'
import './layouts'
import './filters'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
