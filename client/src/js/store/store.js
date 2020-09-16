import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        loggedIn: false,
        accessToken: '',
        refreshToken: ''
    },
    mutations: {
        doLogout() {
            this.clearToken();
            state.loggedIn = false;
        },
        clearToken() {
            state.accessToken = '';
            state.refreshToken = '';
        },
        storeLogintoStore(userInfo){
            state.loggedIn = true;
            state.accessToken = userInfo.accessToken;
            state.refreshToken = userInfo.refreshToken;
        }

    }
});

export default store;
