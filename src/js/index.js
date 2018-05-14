// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/modules/paas/App'
import store from '../store'
import * as filters from '@/common/filters'
import Axios from '@/common/api/http'
import router from '@/modules/index/router'

Vue.use(ElementUI)
Vue.prototype.$http = Axios

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<App/>',
  components: { App }
})
