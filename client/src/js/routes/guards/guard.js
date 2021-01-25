import store from '../../store/store.js';
import jwtDecode from 'jwt-decode';
export const authenticatedOnly = (to,from,next) => {
	next(store.getters.getUserLoginStatus);
}


/**
* route guard that test for token
* the function takes the token from localstorage
* and loads it to the store on every before-route-enter
* this way we don't need a page refresh but a mere
* page change would do.
*/
export const loginIfTokenExists = (refreshToken,accessToken,username) => {
	let timeNow = new Date();
	let refreshTokenObject = jwtDecode(refreshToken);
	let tokenExpired = refreshToken &&  new Date(refreshTokenObject.exp * 1000) < timeNow;
	if(!tokenExpired){
		if(!store.getters.getUserLoginStatus){
			store.dispatch("login",{
			accessToken: accessToken,
			refreshToken:refreshToken,
			username:username
		});
		return true;	
	}else{
		return true;
		}
		
	}
	store.dispatch("logout");
	return false;

}

