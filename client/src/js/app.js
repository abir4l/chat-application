import Vue from "vue";
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './routes/route.js';
import store from './store/store.js';
import sanitize from 'vue-sanitize';
import axiosInstance from './lib/api.js';
import config from './config.js';
import io from 'socket.io-client';


let defaults = sanitize.defaults;

defaults.allowedTags = defaults.allowedTags.filter((t) => {
  return true;
});

Vue.use(sanitize,defaults);
Vue.prototype.$http = axiosInstance;
const socketIo = io(config.url(''));


socketIo.on("logout",(data) =>{
	store.dispatch("logout");
});

window.app = new Vue({
        el:'#app',
        router:router,
        render: (h) => h(App),
        store:store
});


