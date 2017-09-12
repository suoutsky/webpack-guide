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
  routes: [
      {
          path: '/button',
          component: require('./routers/button.vue')
      },
      {
        path: '/vnode',
        component: require('./routers/vnode.vue')
      },
      {
        path: '/vtable',
        component: require('./routers/vtable.vue')
      },
      {
        path: '/modal',
        component: require('./routers/modal.vue')
      }
  ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});