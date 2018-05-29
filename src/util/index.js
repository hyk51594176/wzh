export const setKeepAlive = (to, from, store) => {
  let keepRooters = [...store.state.keepRooters]
  if (keepRooters.indexOf(to.name) < 0) keepRooters.push(to.name)
  let index = keepRooters.indexOf(from.name)
  if (store.state.direction === 'back' || store.state.direction === 'replace') {
    keepRooters.splice(index, 1)
  }
  store.commit('changeKeepRooters', keepRooters)
}
export const dateFormat = (date, fmt = 'yyyyMMdd') => { // author: meizz
  if (typeof date !== 'object' && String(date).length === 8) {
    date = String(date).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    return date
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export const isPhoneNum = str => {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}

export const parseQuery = (query = window.location.search) => {
  let res = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }
  query.split('&').forEach(function (param) {
    let parts = param.replace(/\+/g, ' ').split('=')
    let key = decodeURIComponent(parts.shift())
    let val = parts.length > 0
      ? decodeURIComponent(parts.join('='))
      : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}
