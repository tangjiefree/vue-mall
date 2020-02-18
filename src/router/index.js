import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../components/main'),
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('../components/home')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('../components/list')
        },
        {
          path: '/cart',
          name: 'cart',
          meta: {
            requireToken: true
          },
          component: () => import('../components/cart')
        },
        {
          path: '/center',
          name: 'center',
          component: () => import('../components/center')
        }
      ]
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
