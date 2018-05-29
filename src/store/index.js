import Vuex from 'vuex'
import Vue from 'vue'
import modules from './modules'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
  state: {
    loading: false,
    direction: '',
    keepRooters: ['index'],
    apiHeader: window.localStorage.apiHeader ? JSON.parse(window.localStorage.apiHeader) : null,
    beforePath: null,
    userInfo: null,
    windowSize: {},
    version: '0.0.1',
    shares: {},
    shopList: [],
    address: '',
    shopcode: '100002',
    position: {
      latitude: 30.27806326666806,
      longitude: 120.139937783027
    },
    pushId: null,
    downloader: null
  },
  mutations: {
    updateDownloader (state, downloader) {
      state.downloader = downloader
    },
    updatePushId (state, pushId) {
      state.pushId = pushId
    },
    updateShopcode (state, shopcode) {
      state.shopcode = shopcode
    },
    updateAddress (state, address) {
      state.address = address
    },
    updatePosition (state, position) {
      state.position = position
    },
    updateShares (state, shares) {
      state.shares = shares
    },
    updateWindowSize (state, windowSize) {
      state.windowSize = windowSize
    },
    updateVersion (state, version) {
      state.version = version
    },
    updateLoading (state, loading) {
      state.loading = loading
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    updateDirection (state, direction) {
      state.direction = direction
    },
    changeKeepRooters (state, keepRooters) {
      state.keepRooters = keepRooters
    },
    updateApiHeader (state, apiHeader) {
      state.apiHeader = apiHeader
    },
    updateBeforePath (state, beforePath) {
      state.beforePath = beforePath
    },
    updateShopList (state, shopList) {
      state.shopList = shopList
    }
  },
  actions,
  getters: {
    activeShop (state) {
      return state.shopList.find(obj => obj.shopcode === state.shopcode)
    }
  }
})
