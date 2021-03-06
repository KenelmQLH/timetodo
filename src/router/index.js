import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "login_home_welome" */ '../components/home/Home')
const Today = () => import(/* webpackChunkName: "login_home_welome" */ '../components/home/today/Today')
const History = () => import(/* webpackChunkName: "login_home_welome" */ '../components/home/history/History')
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // redirect: '/home'
    component: Home,
    children: [
      {
        path: '/today',
        component: Today
      },
      {
        path: '/history',
        component: History
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // to 将访问哪一个路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数,表示放行
//   //   next() 放行 next('/login') 强制跳转
//   if (to.path === '/login') return next()
//   // 获取token
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })

export default router
