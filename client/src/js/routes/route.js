import homepage from '../pages/Home.vue'
import loginpage from '../pages/Login.vue'
import userPage from '../pages/User.vue'
import registerPage from '../pages/Register.vue'
import detailPage  from '../pages/Detail.vue'

const routes = [
    {path:'/', component: homepage },
    {path:'/login', component: loginpage },
    {path:'/user', component: userPage },
    {path:'/detail', component: detailPage,beforeRouteEnter:function(to,from,next){

            console.log("entering detail page")


    }},
    {path:'/register', component: registerPage }
];

export default routes;


