<script>
export default {
  name:'xbutton',
  props: ["loading" ],
  mounted: function () {

  },
  methods: {
    clicked: function (event) {
        this.$emit('clicked','');
    },
  },
  mounted:{
        console.log(this.loading);
 },
  computed: {
    
    showLoading: function(){
       return this.loading;
    }

  },
  data: function () {
    return {  


    };
  },
};
</script>

<template>
      <button v-on:click="clicked" class="_button" type="button"><slot></slot><span v-if="showLoading">loading</span></button>
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
