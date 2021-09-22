<script>
export default {
  name: "xbutton",
  props: ["loading"],
  mounted: function () {},
  computed:{
    showLoading: function(){
      return this.loading;
    }
  },
  methods: {
    clicked: function (event) {
      this.$emit("clicked", "");
    },
  },
  mounted: function () {},
  data: function () {
    return {
    };
  },
};
</script>

<template>
  <button :disabled='showLoading' v-on:click="clicked" class="btn btn-primary-custom" type="button">
    <slot v-if="!showLoading"></slot>
    <span v-if="showLoading"> <i class="fa fa-circle-o-notch fa-spin"></i></span>
  </button>
</template>

<style scoped lang="css">
.container {
  margin-top: 10px;
}
button._button {
  border: 1px solid #ccc;
  padding: 5px 10px;
  /* background: #6565e0; */
  color: white;
}
button._button[disabled=disabled]{
  /* background: #9595e2; */
}
</style>
