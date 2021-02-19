<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data: () => {
    return {};
  },
  methods: {
    chatEvent:function(username){
        this.$emit("chat",username);
    },
  },
  computed: {
    ...mapGetters({
      userList: "getUserList",
    }),
  },
};
</script>
<template>
  <div class="mt-5">
    <div
      class="detail-contents mt-3 user-blocks"
      v-for="user in userList"
      :key="user._id"
    >
      <div class="display-flex">
        <div class="user-profile-pic user-profile-pic-sm">
          <span>{{ user.name.charAt(0).toUpperCase() }}</span>
        </div>
        <p class="ml-3 text-color-grey">{{ user.name }}</p>
      </div>
      <button
        class="btn btn-primary-custom"
        v-on:click="chatEvent(user.username)"
      >
        Chat
      </button>
    </div>
  </div>
</template>
<style lang="css">
.user-blocks {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 15px;
}
</style>