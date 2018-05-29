import * as api from '@/api'

export default {
  userLogin ({ commit, dispatch }, params) {
    return api.userLogin(params, true).then(res => {
      const apiHeader = { phone: params.phone, secret: res.data.secret }
      commit('updateApiHeader', apiHeader)
      dispatch('userInfo')
      window.localStorage.apiHeader = JSON.stringify(apiHeader)
      return res.data
    })
  },
  userInfo ({ commit, state, dispatch }) {
    return api.userInfo({ phone: state.apiHeader.phone }).then(res => {
      commit('updateUserInfo', res.data)
      dispatch('payInfoBingDingInfo')
      return res.data
    })
  },
  logOut ({ commit }) {
    window.localStorage.apiHeader = null
    window.sessionStorage.clear()
    commit('updateApiHeader', null)
    commit('updateCardInfo', null)
    commit('updateBingDingInfo', null)
    commit('updateUserInfo', null)
  },
  shopGetAreaShop ({ commit, state }) {
    let data = {
      shoptype: 1,
      longitude: state.position.longitude || 1,
      dimension: state.position.latitude || 1

    }
    return api.shopGetAreaShop(data).then(res => {
      commit('updateAddress', res.data.address || [])
      commit('updateShopList', res.data.data || [])
      return res.data
    })
  },
  setShopCode ({ commit, state }, code) {
    commit('updateShopcode', code)
  }
}
