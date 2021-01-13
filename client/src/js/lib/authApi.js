import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from '../store/store';
import config from '../config.js'
let axiosInstance = Axios.create({});

axiosInstance.interceptors.request.use(
    async (request) => {
        //test for jwt expiry here
        // let token = localStorage.getItem('access_token');
        let token = store.getters.getAccessToken;
        //try to handle the exception here
        let tokenObject = jwtDecode(token);
        let expiryTime = new Date(tokenObject.exp * 1000);
        let timeNow = new Date();
        debugger;
        //verify token time here
        //get refreshtoken if acccess token is about to expire or is expired
        if (timeNow > expiryTime) { // token expired

            let refreshToken = store.getters.getRefreshToken;
            let refreshTokenObject = jwtDecode(refreshToken);
            if (new Date(refreshTokenObject.exp * 1000) > timeNow) {
                console.log("fetching new token");
                let response = await Axios.post(config.url('user/access-token'), {}, {headers: {"Authorization": "Bearer " + refreshToken}});
                localStorage.setItem('access_token', response.data.accessToken);
                token = response.data.accessToken;
            } else { // refresh token is expired as well, logout the user, cancel the request
                store.dispatch("logout");
            }
        }
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    }, error => Promise.reject(error)
);

export default axiosInstance;
