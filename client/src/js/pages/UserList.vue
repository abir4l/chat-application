<script>
import nav from "../components/Navigation.vue";
import users from "../components/Users.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { navigation: nav, users: users },
  data: () => {
    return {};
  },
  methods: {
    ...mapActions(["loadUserList"]),
    goToHomePage: function () {
      this.$router.push("/");
    },
    goToChat(username){
      this.$store.dispatch("setUpChat", { username });
      this.$router.push("/user/chat/" + username);
    }
  },
  computed: {
    ...mapGetters({
      userList: "getUserList",
    }),
  },
  mounted: function () {
    // this.getUserList();
    this.loadUserList();
  },
};
</script>


<template>
  <div class="contents mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 center-alignment">
          <navigation></navigation>
        </div>
      </div>
      <div class="row mt-5">
        <div class="users-wrapper col-md-6">
          <div class="">
            <users @chat="goToChat"></users>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>