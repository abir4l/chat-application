<script>
import loginService from '../services/LoginService';
import {mapActions} from 'vuex';
export default {
  data: function () {
    return {
        email:'',
        password:''

    };
  },
  methods: {
      ...mapActions([
          'logout',
          'storeToken',
          'login'
      ]),
    doLogin:function(){
        loginService.login({
            email:this.email,
            password:this.password
        },this.$router,this.login);
    },
    userPage() {
      this.$router.push("/user");
    },
    goToHomePage: function () {
      this.$router.push("/");
    },
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
          <h1></h1>
          <button v-on:click="goToHomePage()">Home</button>
        </div>
      </div>
      <div class="row mt-5">
        <div>
          <div class="form-group">
            <input type="text" v-model="email" class="form-control" placeholder="email" />
          </div>
          <div class="form-group">
            <input type="password" v-model="password" class="form-control" placeholder="password" />
          </div>
          <div class="form-group">
              <button class="btn btn-primary" v-on:click="doLogin()" type="button">
                  Login
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
