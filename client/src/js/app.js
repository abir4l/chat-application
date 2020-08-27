import Vue from "vue";
import Axios from 'axios';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes/route.js';
import store from './store/store.js';


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


