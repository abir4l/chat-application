import Vue from "vue";
import Axios from 'axios';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from './routes/route';
import store from './store/store.js';
import xbut from './components/Button.vue'
import test from './components/Trial.vue'


Vue.component('test',test);
Vue.prototype.$http = Axios;
Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

window.app = new Vue({
        el:'#app',
        router:router,
        render: (h) => h(App),
        store:store
});


