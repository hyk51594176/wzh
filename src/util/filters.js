import {dateFormat} from './index'
const currency = (value, currency, decimals) => {
  var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
}
const mixin = {
  activated () {
    if (this.$refs.pageConner && this.$route.meta.scrollTop) {
      this.$refs.pageConner.scrollTop = this.$route.meta.scrollTop
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$refs.pageConner) {
      from.meta.scrollTop = this.$refs.pageConner.scrollTop
    }
    next()
  }
}
export default {
  install (Vue) {
    Vue.filter('currency', currency)
    Vue.filter('date', dateFormat)
    Vue.mixin(mixin)
  }
}
