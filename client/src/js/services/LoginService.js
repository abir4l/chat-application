import api from '../lib/api.js';
import config from '../config.js';
export default {

    /**
     *
     * @param user
     * @param router
     * @param storeLogin: store ACTION function directly injected from component,
     *                    in order to not use vuex outside vue components
     */
    login: async function (user,router) {
       
        let response = await api.post(config.url('user/login'), user);
        let data = response.data;
        localStorage.setItem('refresh_token',data.refreshToken);
        localStorage.setItem('access_token',data.accessToken);
        localStorage.setItem('email',data.email);
        localStorage.setItem('username',data.username);
        return data;
    
    }



}
