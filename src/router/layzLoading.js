export default path => () => import(`pages/${path}.vue`)

// const files = require.context('../pages', true, /\.vue$/)
// let filesobj = {}
// files.keys().forEach(key => {
//   console.log(key)
//   filesobj[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
// })

// export default (key) => {
//   console.log(key)
//   return filesobj[key]
// }
