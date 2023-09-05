import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration


//路由全局前置守卫
router.beforeEach((to,from,next) => {
  NProgress.start()
  if(to.path === '/register' || to.path === '/login' || to.path === '/'){ //若是进入登录与注册页面 ==> pass
    next()
  }else{ 
    let userToken = localStorage.getItem('token');
    console.log("Token为:"+userToken); 
    if(userToken == null || userToken == ''){
      this.$message.error("无权限，请先登录!");
      return next('/login');
    }else{
      next();
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
