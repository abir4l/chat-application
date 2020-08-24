import Vue from "vue";
import Axios from 'axios';
import trial from './components/Trial.vue'
import button from './components/Button.vue'


Vue.prototype.$http = Axios;
Vue.component('trial',trial);
Vue.component('xbutton',button);

window.app = new Vue({ el:'#app',data: function(){
        return {
            helloCount:0

        }
},
    methods:{
        increaseHelloCount : function(ev) {
            this.helloCount++;
        }
    },
});


