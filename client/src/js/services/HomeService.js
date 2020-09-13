import api from '../lib/authApi';
export default {

    loadlibraries: function() {
      return  api.get('https://api.cdnjs.com/libraries/jquery');
    }

}

