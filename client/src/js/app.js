import Vue from "vue";
import Axios from 'axios';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes/route.js';
import store from './store/store.js';
import sanitize from 'vue-sanitize';

let defaults = sanitize.defaults;

defaults.allowedTags = defaults.allowedTags.filter((t) => {
  return true;
});
Vue.use(sanitize,defaults);
let axiosInstance = Axios.create({ 
});

axiosInstance.interceptors.request.use(

        request => (request) => {
            console.log('using axios');
            return request;
        }
)
Vue.prototype.$http = axiosInstance;
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


