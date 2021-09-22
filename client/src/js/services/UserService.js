import api from '../lib/authApi';
import config from '../config.js';
// import store from '../store/store.js';
export default {


	getUserlist: () => {
		// make an api call here
		 return  api.get(config.url("user/list"));

	},
	chat:(username) => {

			


	}

}

