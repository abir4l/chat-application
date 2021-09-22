import config from '../config.js';
import axios from 'axios';

export default {
	validate (params) {
    return new Promise((resolve, reject) => {
      axios.post(config.url("user/recaptcha/validate"), params)
        .then(response => {
			if (response.data.hasErrors) {
				reject(false)
			} else {
				resolve(response.data)
			}
        })
        .catch(error => {
        	reject(false)
        })
    })
  }
}