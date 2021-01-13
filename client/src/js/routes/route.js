import homepage from '../pages/Home.vue'
import loginpage from '../pages/Login.vue'
import userListPage from '../pages/UserList.vue'
import userPage from '../pages/Chat.vue'
import registerPage from '../pages/Register.vue'
import detailPage  from '../pages/Detail.vue'
import VueRouter from "vue-router";

import {routeGuards} from "../lib/common.js";
import {authenticatedOnly,loginIfTokenExists} from "./guards/guard.js";

import Vue from "vue";


Vue.use(VueRouter);
const routes = [
    {path:'/', component: homepage },
    {path:'/login', component: loginpage},
    {path:'/user/chat/:username', component: userPage},
    {path:'/user/list', component: userListPage },
    {path:'/detail',component: detailPage,beforeEnter:authenticatedOnly},
    {path:'/register', component:registerPage }
];

const router = new VueRouter({
    routes
});


router.beforeEach((to, from, next) => {
  let refreshToken = localStorage.getItem("refresh_token");
  let accessToken = localStorage.getItem("access_token");
  let username = localStorage.getItem("username");
  loginIfTokenExists(refreshToken,accessToken,username);
  next(true);
});




export default router;


