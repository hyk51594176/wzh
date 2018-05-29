import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { baseUrl } from '@/config'
import md5 from 'js-md5'
import Vue from 'vue'
const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'application/json',
  },
  transformRequest: [
    function (data, config) {
      if (config['Content-Type'] === 'application/x-www-form-urlencoded') { data = qs.stringify(data) }
      if (config['Content-Type'] === 'application/json') { data = JSON.stringify(data) }
      return data
    }
  ],
  // withCredentials: true,
  timeout: 60000
})
function toast (msg) {
  Vue.prototype.$toast(msg)
}
instance.interceptors.request.use(
  function (config) {
    if (store.state.apiHeader) {
      let { phone, secret } = store.state.apiHeader
      let timestamp = Date.now()
      config.headers.phone = phone
      config.headers.timestamp = timestamp
      config.headers.sign = md5(
        secret + config.url.split(baseUrl)[1] + timestamp + secret
      ).toUpperCase()
    }
    config.headers.uuid = Date.now().toString()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
let arr = []

function init (obj) {
  arr.push(obj)
  setTimeout(() => {
    store.commit('updateLoading', arr.length > 0)
  }, 300)
}

function del (obj) {
  arr.splice(arr.indexOf(obj), 1)
  setTimeout(() => {
    store.commit('updateLoading', arr.length > 0)
  }, 300)
}

export default ({
  url = '',
  data = {},
  showMsg = false,
  method = 'get',
  config = {}
}) => {
  let obj = { url, data, method, showMsg, config }
  init(obj)
  if (method === 'get') {
    data = { params: data }
  }
  return instance[method](url, data, config)
    .then(res => {
      del(obj)
      if (res.data.code === 'OK') {
        showMsg && res.data.message && toast(res.data.message)
        return res.data
      } else {
        let err = new Error(res.data.message || res.statusText)
        err.code = res.data.code
        err.response = res
        return Promise.reject(err)
      }
    })
    .catch(({message, response, code}) => {
      del(obj)
      console.error(code, message)
      console.error('ajax_error', JSON.stringify(response))
      showMsg && message && toast(message)
      return Promise.reject(response)
    })
}
