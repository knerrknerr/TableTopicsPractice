import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

document.title = 'Table Topics Practice';
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  data: {
    minTime: 60,
    maxTime: 120,
    displayTimes: false,
  },
  render: h => h(App)
}).$mount('#app')
