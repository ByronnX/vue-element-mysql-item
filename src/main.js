import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用elementui
Vue.use(ElementUI);
//引入全局样式
import '@/assets/global.css'
//axios
import axios from '@/utils/request';
Vue.prototype.$axios = axios
//echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
