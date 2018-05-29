import icon from './icon'
export default {
  install (Vue, options = {}) {
    Vue.component('icon', icon)
  }
}
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context(`./svg`, false, /\.svg$/)
requireAll(req)
