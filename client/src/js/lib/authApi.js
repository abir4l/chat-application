import Axios from 'axios';
import jwtDecode from 'jwt-decode';

let axiosInstance = Axios.create({});


function testToken(token) {
    console.log(token);
}

axiosInstance.interceptors.request.use(
    async (request) => {
        //test for jwt expiry here
        let token = localStorage.getItem('access_token');
        //try to handle the exception here
        let tokenObject = jwtDecode(token);
        let expiryTime = new Date(tokenObject.exp * 1000);
        let timeNow = new Date();

        //verify token time here
        //get refreshtoken if acccess token is about to expire or is expired
        if (timeNow > expiryTime) { // token expired

            let refreshToken = localStorage.getItem('refresh_token');
            let refreshTokenObject = jwtDecode(refreshToken);
            if (new Date(refreshTokenObject.exp * 1000) > timeNow) {
                console.log("fetching new token");
                let response = await Axios.post('http://localhost:8888/user/access-token', {}, {headers: {"Authorization": "Bearer " + refreshToken}});
                localStorage.setItem('access_token', response.data.accessToken);
                token = response.data.accessToken;
            } else { // refresh token is expired as well, logout the user, cancel the request

            }
        }
        //logout if refreshtoken is also expired
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    }, error => Promise.reject(error)
);

export default axiosInstance;
