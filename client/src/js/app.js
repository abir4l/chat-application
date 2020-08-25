import Vue from "vue";
import Axios from 'axios';
import homepage from './pages/Home.vue'
import loginpage from './pages/Login.vue'
import App from './App.vue'
import VueRouter from 'vue-router'


Vue.prototype.$http = Axios;


Vue.use(VueRouter);
const routes = [
    {path:'/', component: homepage },
    {path:'/login', component: loginpage }
];

const router = new VueRouter({
        routes
});

window.app = new Vue({
        el:'#app',
        router:router,
        render: (h) => h(App)
});


