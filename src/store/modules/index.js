export default (file => {
  let modules = {}
  file.keys().forEach(key => {
    if (key === './index.js') return
    modules[key.replace(/(\.\/|\.js)/g, '')] = file(key).default
  })
  return modules
})(require.context('./', false, /\.js$/))
