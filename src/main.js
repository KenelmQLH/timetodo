import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/common.css'
import './assets/iconfonts/iconfont.css'

// import './assets/css/element-variables.scss'
// 导入字体图标
// import './assets/fonts/iconfont.css'
// 导入全局样式表
// import './assets/css/global.css'

import axios from 'axios'
// // 在request拦截器中展示进度条 NProgress.start()
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// // axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// // axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

// // 拦截设置
// axios.interceptors.request.use(config => {
//   NProgress.start()
//   // 登录授权 请求验证是否有token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config // 必须返回否则没有值
// })
// // 在reponse拦截器中,隐藏进度条 NProgress.done()
// axios.interceptors.response.use(config => {
//   NProgress.done()
//   return config
// })
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
