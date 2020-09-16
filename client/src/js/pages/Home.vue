<script>
    import service from "../services/HomeService";
    import {tokenExpired} from "../lib/common";

    export default {
        component: {},
        data: function () {
            return {
                title: "Home",
            };
        },

        mounted: function () {
        },
        computed: {
            showLogin: function () {
                return tokenExpired();
            }
        },
        methods: {
            login: function () {
                this.$router.push("/login");
            },
            doLogout: function () {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('email');
                //need to use state here to refresh the page
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
                        <li v-if="showLogin">
                            <router-link to="/login"> Login</router-link>
                        </li>
                        <li v-if="showLogin">
                            <router-link to="/register">Register</router-link>
                        </li>
                        <li v-if="!showLogin">
                            <router-link to="/detail">Details</router-link>
                        </li>
                        <li v-if="!showLogin">
                            <a href="#" v-on:click="doLogout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
