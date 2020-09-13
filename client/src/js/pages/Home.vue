<script>
import service from "../services/HomeService";
export default {
  component: {},
  data: function () {
    return {
      title: "Home page",
    };
  },
  mounted: function () {
    service.loadlibraries().then((data) => {
      this.title = data.data.name;
      console.log(data.data.name);
    });
  },
  computed: {},
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
          <button v-on:click="login()">login</button>
        </div>
      </div>
    </div>
  </div>
</template>
