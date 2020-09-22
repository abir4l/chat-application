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
    login: function (user,router,storeLogin) {
        api.post(config.url + 'user/login', user)
            .then(
                resp => {
                    let data = resp.data;
                    localStorage.setItem('refresh_token',data.refreshToken);
                    localStorage.setItem('access_token',data.accessToken);
                    localStorage.setItem('email',data.email);
                    storeLogin(data);
                    router.push('detail');
                }
            ).catch(er => {
                if (er.response) {
                    if(er.response.status === 404){
                        alert(
                            'User not found'
                        );
                    }
                }
                else
                    console.log(er);
            });


    }



}
