import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../components/home'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login')
    },
    {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: () => import('../components/goodsDetail')
    }
  ],
});
