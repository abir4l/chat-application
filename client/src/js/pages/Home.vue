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
      showLogin:function(){
        return tokenExpired();
      }
  },
  methods: {
    login: function () {
      this.$router.push("/login");
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
          <h1>{{title}}</h1>
          <ul class="nav flex-column">
              <li v-if="showLogin">
                  <router-link to="/login"> Login</router-link>
              </li>
              <li v-if="showLogin">
                  <router-link to="/register">Register</router-link>
              </li>
              <li>
                  <router-link to="/detail">Details</router-link>
              </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
