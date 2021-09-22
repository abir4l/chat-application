import api from '../lib/api.js';
import config from '../config.js';
export default {
    register: async function (user) {
        return api.post(config.url('user/register'), user)
        .then( data => {
            return {
                'success': true,
            }
        }).catch(err => {
            if (typeof err.response != 'undefined') {
                return {
                    'success': false,
                    'error': err.response.data.message
                }   
            }
            return {
                'success': false,
                'error': "Error occured in server"
            }
        });
    }
}
