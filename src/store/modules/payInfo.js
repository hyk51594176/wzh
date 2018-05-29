import * as api from '@/api'

export default {
  state: {
    cardInfo: null,
    bingDingInfo: null,
    uniPayInfo: null,
    aliPayInfo: null,
    payType: null
  },
  mutations: {
    updateBingDingInfo (state, bingDingInfo) {
      state.bingDingInfo = bingDingInfo
    },
    updateCardInfo (state, cardInfo) {
      state.cardInfo = cardInfo
    },
    updateUniPayInfo (state, uniPayInfo) {
      state.uniPayInfo = uniPayInfo
    },
    updateAliPayInfo (state, aliPayInfo) {
      state.aliPayInfo = aliPayInfo
    },
    updatePayType (state, payType) {
      state.payType = payType
    }
  },
  actions: {
    payInfoCardInfo ({commit, state}) {
      return api.payInfoCardInfo({cardId: state.bingDingInfo.cardno}).then(res => {
        commit('updateCardInfo', res.data)
        return res.data
      })
    },
    payInfoBingDingInfo ({commit, state, dispatch, rootState}) {
      return api.payInfoBingDingInfo({phone: rootState.apiHeader.phone}).then(res => {
        commit('updateBingDingInfo', {...res.data, cardId: res.data.cardno})
        dispatch('payInfoCardInfo')
        return res.data
      })
    },
    payInfoBingDingCard ({state, dispatch}, data) {
      return api.payInfoBingDingCard(data, true).then(res => {
        dispatch('payInfoBingDingInfo')
        return res.data
      })
    },
    conponUnbindCard ({state, dispatch, rootState}) {
      var reqsn = [Date.now(), Math.floor((Math.random() + 1) * 1e5)].join('')
      return api.conponUnbindCard({ phone: rootState.apiHeader.phone, cardno: state.bingDingInfo.cardno, reqsn, begintime: '20171130092231' }, true).then(res => {
        dispatch('payInfoBingDingInfo')
        return res.data
      })
    }
  }
}
