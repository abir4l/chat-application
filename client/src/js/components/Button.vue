<script>
export default {
  name:'xbutton',
  props: [ "clickCounter"],
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
      <button v-on:click="clicked" class="_button" type="button"><slot></slot></button>
  </div>
</template>

<style scoped lang="css">

.container{

    margin-top:10px;
}
button._button {
    border: 1px solid #ccc;
    padding: 5px 10px;
    background: #6565e0;
    color: white;
}

</style>
