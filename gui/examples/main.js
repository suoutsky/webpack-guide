import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import iView from '../src/index';

Vue.use(VueRouter);
Vue.use(iView);
// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
  router: [
      {
          path: '/button',
          component: require('./routers/button.vue')
      }
  ]
});

new Vue({
    el: '#app',
    router: router,
    rende: h => h(App)
});