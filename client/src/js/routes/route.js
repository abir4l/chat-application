import homepage from '../pages/Home.vue'
import loginpage from '../pages/Login.vue'
import userPage from '../pages/User.vue'
import registerPage from '../pages/Register.vue'
import detailPage  from '../pages/Detail.vue'
import VueRouter from "vue-router";
import Vue from "vue";
import store from '../store/store';

Vue.use(VueRouter);
const routes = [
    {path:'/', component: homepage },
    {path:'/login', component: loginpage },
    {path:'/user', component: userPage },
    {path:'/detail', component: detailPage },
    {path:'/register', component: registerPage }
];

const router = new VueRouter({
    routes
});

export default router;


