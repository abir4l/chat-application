<script>
import loginService from '../services/LoginService';
export default {
  data: function () {
    return {
        email:'',
        password:''

    };
  },
  methods: {
    login:function(){
        loginService.login({
            email:this.email,
            password:this.password
        });
    },
    userPage() {
      this.$router.push("/user");
    },
    goBack: function () {
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
          <h1>Login page</h1>
          <button v-on:click="goBack()">Back</button>
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
              <button class="btn btn-primary" v-on:click="login()" type="button">
                  Login
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
