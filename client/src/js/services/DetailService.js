import api from '../lib/authApi.js';
import config from '../config.js';

export default {
    getDetails:function(){
        return api(config.url+'user/details');
    }


}
