import api from '../lib/api.js';
const server = 'http://localhost:8888/';
export default {

    login: function (user) {

        
        api.post(server + 'user/login', user)
            .then(
                resp => {
                    let data = resp.data;
                    localStorage.setItem('refresh_token',data.token);
                    localStorage.setItem('email',data.email);
                }
            ).catch(er => {
                
                if (er.response) {
                    
                    if(er.response.status == 404){
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