<script>
export default {
  props: ["buttonText", "clickCounter"],
  mounted: function () {

  },
  methods: {
    clicked: function (event) {
      this.counter++;
      this.$emit('increased',this.counter);
    },
  },
  data: function () {
    return { counter: this.clickCounter };
  },
};
</script>

<template>
  <div class="container">
    <button v-on:click="clicked" class="_button" type="button">{{buttonText}}</button>
  </div>
</template>

<style lang="css">
button._button {
  border: 1px solid #ccc;
  padding: 5px 10px;
}
</style>