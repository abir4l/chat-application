import jwt_decode from 'jwt-decode';
export default {

    decryptToken: function(token){
        let decoded = jwt_decode(token);
        return decoded;
        
    }

}
