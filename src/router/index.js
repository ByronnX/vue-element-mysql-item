import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//创建路由
const routes =[
    
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/login')
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path:'/',
        component:() => import('@/Layout')
    },
    {
        path:'*',
        redirect:'/login',
    }
]

//创建路由对象
const router = new VueRouter({
    mode:'history',
    routes
})

export default router