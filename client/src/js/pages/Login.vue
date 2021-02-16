<script>
import loginService from '../services/LoginService';
import {mapActions} from 'vuex';
import Captcha from '../components/Captcha.vue'

export default {
  components: {Captcha},
  data: function () {
    return {
        email:'',
        password:'',
        errors: [],
        validateRecaptcha: false
    };
  },
  methods: {
      ...mapActions([
          'logout',
          'storeToken',
          'login'
      ]),
      doLogin:async function(){
        this.errors = [];

        if (!this.email) {
            this.errors.push("Email is required");
        }
        if (!this.password) {
            this.errors.push("Password is required");
        }
        if (!this.validateRecaptcha) {
            this.errors.push("Captcha is required");
        }

        if (this.errors.length) {
            return;
        }

        try {
          let user = await loginService.login({
              email:this.email,
              password:this.password
          });

          if(user){
              this.$store.dispatch("login",user).then(  () =>{
                  this.$router.push('detail');
              });   
          } else {
            this.errors.push("Invalid Login!");
            this.resetCaptcha();
            return;
          }
        } catch (err) {
          this.errors.push("Invalid Login!");
          this.resetCaptcha();
          return;
        }
    },
    userPage() {
      this.$router.push("/user");
    },
    goToHomePage: function () {
      this.$router.push("/");
    },
    validate: function (success) {
      this.validateRecaptcha = success
    },
    resetCaptcha: function() {
      this.$refs.recaptcha.$refs.recaptcha.reset();
      this.validateRecaptcha = false;
    }
  },
};
</script>
<style>
</style>
<template>
<!-- TODO: remove login controls from login page -->
  <div class="contents">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1></h1>
          <button v-on:click="goToHomePage()">Home</button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="login-wrapper">
          <div class="form-group">
            <h3 class="custom-title">User login</h3>
          </div>
          <div class="form-group" v-if="errors.length">
            <div class="alert alert-danger">
                Please correct the following error(s):
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
          </div>
          <div class="form-group mt-5">
            <input type="text" autocomplete="false" v-model="email" class="form-control form-input" placeholder="Email" />
          </div>
          <div class="form-group mt-3">
            <input type="password" autocomplete="false" v-model="password" class="form-control form-input" placeholder="Password" />
          </div>
          <div class="form-group mt-4">
              <Captcha ref="recaptcha" @validate="validate"/>
          </div>
          <div class="login-controls mt-4">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="rememberme">
              <label class="form-check-label text-color-red cursor-pointer" for="rememberme">Remember me.</label>
            </div>
            <div class="forget-password">
              <a href="#" class="text-color-red">Forgot password?</a>
            </div>
          </div>
          <div class="form-group mt-4">
              <button class="btn btn-primary-custom btn-block" v-on:click="doLogin()" type="button">
                  Login
              </button>
          </div>
          <div class="form-group mt-4">
            <span class="text-color-grey">Don't have an account?</span> <router-link class="text-color-red" to="/register">Sign up.</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
