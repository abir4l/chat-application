import Vuex from 'vuex';
import Vue from 'vue';
import { tokenExpired } from '../lib/common';
import UserService from '../services/UserService.js';

Vue.use(Vuex);
let accessToken = localStorage.getItem('access_token');
let refreshToken = localStorage.getItem('refresh_token');
let username = localStorage.getItem('username');
const store = new Vuex.Store({
    state: {
        userState: {
            loggedIn: !tokenExpired(),
            accessToken: accessToken ? accessToken : '',
            refreshToken: refreshToken ? refreshToken : '',
            username: username ? username : ''

        },
        serverData: {
            message: ''
        },
        chatStore: {
            reciever: {},
            chatHistory: []
        },
        chatMessages: [],
        socketData: {},
        userList: []

    },
    getters: {
        getChatMessages: function (state) {
               return state.chatMessages; 
        },
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
        },
        getServerSocketData: function (state) {
            return state.serverData.message
        },
        getChatStore: function (state) {
            return state.chatStore;
        },
        getUserState: function (state) {
            return state.userState;
        },
        getChatHistory: function (state) {
            return state.chatStore.chatHistory;
        },
        getUserList: function (state) {
            return state.userList;
        }
    },
    mutations: {
        doLogout(state) {
            state.userState.loggedIn = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
        },
        clearToken(state) {
            state.userState.accessToken = '';
            state.userState.refreshToken = '';
        },

        doLogin(state, userInfo) {
            state.userState.loggedIn = true;
            state.userState.accessToken = userInfo.accessToken;
            state.userState.refreshToken = userInfo.refreshToken;
            state.userState.username = userInfo.username;
        },
        logServerCall(state, data) {
            state.serverData.message = data;
        },
        doSetUpChat(state) {

        },
        doChat(state, data) {
            state.chatStore.chatHistory.push(data);
        },
        doLoadChat(state, data) {
            console.log('loading chat history data ');
            data = data.map(
                d => {
                    let currentUsername = state.userState.username;
                    if (d.sender == currentUsername)
                        d['type'] = 'from';
                    else
                        d['type'] = 'to';
                    return d;
                    d['message_type'] = d.type;
                    if(d.sender == currentUsername)
                        d['type'] = 'from';
                    else
                        d['type'] = 'to';
                    return d;
                }
            ).reverse();
            state.chatStore.chatHistory = data;
        },
        doAddSocket(state, data) {
            state.socketData.id = data;
        },
        doChatNew(state, data) {
            // todo need to have username to add to chatmessage
            let reciever = state.chatMessages.find(m => m.reciever == data.reciever);
            if(reciever){
                state.chatMessages = state.chatMessages.map(m => {
                    if(m.reciever === reciever){
                        m.history = data.data;
                    }
                    return m;
                })
            }else{
                state.chatMessages.push(data)
            }

        },
        async doLoadUserList(state, data) {
            let response = await UserService.getUserlist();
            let username = state.userState.username;
            state.userList = response.data.filter(d => d["email"] && d["username"] !== username);
        }



    },
    actions: {
        logout: function ({ commit }) {
            commit('doLogout');
            commit('clearToken');
        },
        login: function ({ commit }, userInfo) {
            commit('doLogin', userInfo);
        },
        serverCall: function ({ commit }, data) {
            commit('logServerCall', data);
        },

        setUpChat: function ({ commit }) {
            commit('doSetUpChat');
        },
        addChat: function ({ commit }, data) {
            commit('doChat', data);
        },
        addChatMessages: function ({ commit }, data) {
            commit("doChatNew", data)
        },
        loadChat: function ({ commit }, data) {
            commit('doLoadChat', data);
        },
        addSocketData: function ({ commit }, data) {
            commit('doAddSocket', data);
        },

        loadUserList({ commit }) {
            commit('doLoadUserList')
        }
    }
});

export default store;
