import homepage from '../pages/Home.vue'
import loginpage from '../pages/Login.vue'
import userPage from '../pages/User.vue'

const routes = [
    {path:'/', component: homepage },
    {path:'/login', component: loginpage },
    {path:'/user', component: userPage }
];

export default routes;


