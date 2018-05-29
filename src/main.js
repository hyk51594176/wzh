import 'babel-polyfill'
import Vue from 'vue'
import { Loading, Toast, Dialog } from 'vant'
import fastclick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import common from 'components/common'
import { setKeepAlive } from '@/util'
import filters from '@/util/filters'
import PlusApi from '@/util/PlusApi'

import '@/assets/css/common.less'
import icon from '@/icon'
import * as api from '@/api'
fastclick.attach(document.body)
Vue.use(common)
Vue.use(icon)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(filters)
Vue.use(Dialog)
Vue.use(PlusApi, store)

Vue.prototype.$api = api
Vue.config.productionTip = false;
['push', 'replace', 'back'].forEach(key => {
  let _method = router[key].bind(router)
  router[key] = location => {
    store.commit('updateDirection', key)
    _method(location)
  }
})

window.addEventListener('popstate', e => {
  store.commit('updateDirection', 'back')
})

router.beforeEach((to, from, next) => {
  if (to.meta.isNeedLogin && !store.state.apiHeader) {
    store.commit('updateBeforePath', to.path)
    next('/login')
    return
  }
  if (store.state.apiHeader && to.path === '/login') {
    next(from.path)
    return
  }

  if (!window.localStorage.first && to.path !== '/welcome') {
    next('/welcome')
    window.localStorage.first = 'nofirst'
    return
  }
  setKeepAlive(to, from, store)
  next()
})
let vRouter = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.use({
  vRouter
})
