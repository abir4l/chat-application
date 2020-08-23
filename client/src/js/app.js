import Vue from "vue";
import Axios from 'axios';
import trail from './components/Trail.vue'
import button from './components/Button.vue'


Vue.prototype.$http = Axios;
Vue.component('trail',trail);
Vue.component('Button',button);

window.app = new Vue({ el:'#app',data: function(){
        return {
        }
}});


