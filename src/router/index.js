import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName: "login" */ '../components/login/Login')
const Home = () => import(/* webpackChunkName: "home" */ '../components/home/Home')
const Today = () => import(/* webpackChunkName: "today" */ '../components/home/today/Today')
const History = () => import(/* webpackChunkName: "history" */ '../components/home/history/History')
const Deadline = () => import(/* webpackChunkName: "deadline" */ '../components/home/deadline/Deadline')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/today',
    children: [
      {
        path: '/today',
        component: Today
      },
      {
        path: '/history',
        component: History
      },
      {
        path: '/deadline',
        component: Deadline
      }

    ]
  }
]

const router = new VueRouter({
  routes: routes
})
// mode: 'history',

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
