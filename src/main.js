import Vue from 'vue'
import App from './App.vue'

// 引入ElementUI并全局配置使用
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, { size: 'small', zIndex: 3000 });

//引入路由
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
