<script>
import registerService from '../services/RegisterService';
export default {
  data: function () {
    return {
        user:{
            email:'',
            password:'',
            name:'',
            username:''
        }
        
    };
  },
  methods: {
    register:function(){
        registerService.register(this.user);
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
          <h1>Register</h1>
          <button v-on:click="goToHomePage()">Back</button>
        </div>
      </div>
      <div class="row mt-5">
        <div>
          <div class="form-group">
            <input type="text" v-model="user.email" class="form-control" placeholder="email" />
          </div>
          <div class="form-group">
            <input type="password" v-model="user.password" class="form-control" placeholder="password" />
          </div>
          <div class="form-group">
              <input class="form-control" v-model="user.name" type="text" placeholder="Name">
          </div>
          <div class="form-group">
              <input class="form-control" v-model="user.username" type="text" placeholder="UserName">
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
