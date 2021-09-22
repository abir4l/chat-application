<script>
import service from "../services/HomeService";
import {tokenExpired} from "../lib/common";
import {mapGetters} from 'vuex';

export default {
    component: {},
    data: function () {
        return {
                title: "Testing dashboard",
            };
        },

        mounted: function () {
        },
        computed: {
            ...mapGetters(
            {
                loggedIn: 'getUserLoginStatus',
            }),

        },
        methods: {
            doLogout: function () {
                // this.$store.dispatch('logout');
                this.$store.dispatch("logout");
                
            }

        },
    };
    </script>
    <style>
    </style>
    <template>
        <div class="contents">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h1>{{title}}</h1>
                        <ul class="nav flex-column">
                            <li v-if="!loggedIn">
                                <router-link to="/login"> Login</router-link>
                            </li>
                            <li v-if="!loggedIn">
                                <router-link to="/register">Register</router-link>
                            </li>
                            <li v-if="loggedIn">
                                <router-link to="/detail">Details</router-link>
                            </li>
                           <!--  <li v-if="loggedIn">
                                <router-link to="/user">Chat</router-link>
                            </li> -->
                            <li v-if="loggedIn">
                                <router-link to="/user/list">Users</router-link>
                            </li>
                             <li v-if="loggedIn">
                                <a href="#" v-on:click="doLogout()">Logout</a>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </template>
