<script>
import registerService from '../services/RegisterService';
import Captcha from '../components/Captcha.vue'
export default {
  components: {Captcha},
  data: function () {
    return {
        user:{
            email:'',
            password:'',
            name:'',
            username:''
        },
        errors: [],
        validateRecaptcha: false
    };
  },
  methods: {
    register: async function(){
        this.errors = [];

        if (!this.user.name) {
            this.errors.push("Name is required");
        }
        if (!this.user.email) {
            this.errors.push("Email is required");
        }
        if (!this.user.username) {
            this.errors.push("Username is required");
        }
        if (!this.user.password) {
            this.errors.push("Password is required");
        }

        if (!this.validateRecaptcha) {
            this.errors.push("Captcha is required");
        }

        if (this.errors.length) {
            return;
        }

        const data = await registerService.register(this.user);
        if (data.success) {
            this.$router.push("/");
        } else {
            this.errors.push(data.error);
        }
    },
    goToHomePage: function () {
      this.$router.push("/");
    },
    validate: function (success) {
      this.validateRecaptcha = success
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
          <h1>Register</h1>
          <button v-on:click="goToHomePage()">Back</button>
        </div>
      </div>
      <div class="row mt-5">
        
        <div class="register-wrapper">
          <div class="form-group" v-if="errors.length">
            <div class="alert alert-danger">
                Please correct the following error(s):
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
          </div>
          <div class="form-group">
            <h3 class="custom-title">User Registration</h3>
          </div>
          
        <div class="form-group mt-4">
            <input class="form-control form-input" v-model="user.name" type="text" placeholder="Name">
        </div>
        <div class="form-group mt-4">
            <input type="text" v-model="user.email" class="form-control form-input" placeholder="Email" />
        </div>
        <div class="form-group mt-4">
            <input class="form-control form-input" v-model="user.username" type="text" placeholder="Username">
        </div>
        <div class="form-group mt-4">
            <input type="password" v-model="user.password" class="form-control form-input" placeholder="Password" />
        </div>
        <div class="form-group mt-4">
            <Captcha @validate="validate"/>
        </div>
        <div class="form-group">
            <button class="btn-block btn btn-primary-custom" v-on:click="register()" type="button">
                Register
            </button>
        </div>
        <div class="form-group mt-4">
            <span class="text-color-grey">Already have account?</span> <router-link to="/login" class="text-color-red"><span>Login here.</span></router-link>
             
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
