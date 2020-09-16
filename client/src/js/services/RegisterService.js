import api from '../lib/api.js';
import config from '../config.js';
export default {

    register: function (user) {
        api.post(config.url + 'user/register', user)
            .then(
                resp => {
                    debugger;
                }
            ).catch(er => {
                
                if (er.response) {
                    if(er.response.status === 400)
                        console.error('Model validation failed\nRequired fields not provided');
                }
                else
                    console.log(er);
            });


    }



}
