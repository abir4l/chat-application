import  jwtDecoder from 'jwt-decode';
export const tokenExpired = function () {
    let refreshToken = localStorage.getItem("refresh_token");
    if(refreshToken){
        let tokenObject = jwtDecoder(refreshToken);
        let expiryTime = new Date(tokenObject.exp*1000);
        return new Date() > expiryTime;
    }else return true;

};