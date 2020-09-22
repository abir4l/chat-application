import Vuex from 'vuex';
import Vue from 'vue';
import {tokenExpired} from '../lib/common';

Vue.use(Vuex);
let accessToken = localStorage.getItem('access_token');
let refreshToken = localStorage.getItem('refresh_token');
const store = new Vuex.Store({
    state: {
        userState: {
            loggedIn: !tokenExpired(),
            accessToken: accessToken ? accessToken : '',
            refreshToken: refreshToken ? refreshToken : ''
        }

    },
    getters: {
        getUserToken: function (state) {
            return `Access Token="${state.userState.accessToken}"`;
        },
        getUserLoginStatus: function (state) {
            return state.userState.loggedIn;
        },
        getRefreshToken: function (state) {
            return localStorage.getItem('refresh_token');
        },
        getAccessToken: function (state) {
            return localStorage.getItem('access_token');
        }

    },
    mutations: {
        doLogout(state) {
            state.userState.loggedIn = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('email');
        },
        clearToken(state) {
            state.userState.accessToken = '';
            state.userState.refreshToken = '';
        },
        doLogin(state, userInfo) {
            state.userState.loggedIn = true;
            state.userState.accessToken = userInfo.accessToken;
            state.userState.refreshToken = userInfo.refreshToken;

        }

    },
    actions: {
        logout: function ({commit}) {
            commit('doLogout');
            commit('clearToken');
        },
        login: function ({commit}, userInfo) {
            commit('doLogin', userInfo);
        }
    }
});

export default store;
