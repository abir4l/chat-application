import Vue from "vue";
import Axios from 'axios';
import trial from './components/Trial.vue'
import button from './components/Button.vue'
import router from 'vue-router'


Vue.prototype.$http = Axios;
Vue.component('trial',trial);
Vue.component('xbutton',button);

window.app = new Vue({ el:'#app',data: function(){
        return {

        }
},
});


