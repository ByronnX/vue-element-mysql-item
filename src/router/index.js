import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'dashboard',
    meta:{
      title:'仪表盘'
    },
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:() => import("@/components/dashboard")
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login')
  },
  {
    path:'/register',
    name:'register',
    component: () => import('@/views/register')
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect:'/user/maneger',
    meta:{
      title:'用户'
    },
    children:[
      {
        path:'maneger',
        name:'maneger',
        meta:{
          title:'用户管理'
        },
        component:() => import("@/views/user")
      },
      {
        path:'home',
        name:'home',
        meta:{
          title:'用户22'
        },
        component:() => import("@/views/Home")
      }
    ]
  },
]
let originPush =  VueRouter.prototype.push;  //备份原push方法
 
VueRouter.prototype.push = function (location, resolve, reject){
    if (resolve && reject) {    //如果传了回调函数，直接使用
        originPush.call(this, location, resolve, reject);
    }else {                     //如果没有传回调函数，手动添加
        originPush.call(this, location, ()=>{}, ()=>{}); 
    }
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
