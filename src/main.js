// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// eslint-disable-next-line import/first
import axios from 'axios';
import setAxios from './setAxios';
import store from './store';


setAxios();

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.commit('setToken', JSON.parse(localStorage.getItem('token')));
  if(to.meta.requireToken) {
    if(store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
