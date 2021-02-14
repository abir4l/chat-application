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
        <div>
        <div class="form-group" v-if="errors.length">
            <div class="alert alert-danger">
                Please correct the following error(s):
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
        </div>
        <div class="form-group">
            <input class="form-control" v-model="user.name" type="text" placeholder="Name">
        </div>
        <div class="form-group">
            <input type="text" v-model="user.email" class="form-control" placeholder="Email" />
        </div>
        <div class="form-group">
            <input class="form-control" v-model="user.username" type="text" placeholder="Username">
        </div>
        <div class="form-group">
            <input type="password" v-model="user.password" class="form-control" placeholder="Password" />
        </div>
        <div class="form-group">
            <Captcha @validate="validate"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="register()" type="button">
                Register
            </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
