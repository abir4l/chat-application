<script>
import xbutton from "./Button.vue";
export default { 

  data: function () {
    return {
      msg: "Hello world",
      clickCounter:0
    };
  },
  mounted: function () {
  },
  methods: {

      increaseValue: function(ev){
          this.clickCounter++;
      }

  },
};
</script>
<template>
  <div class="content">
    <h1>Loaded from the vue {{msg}}</h1>  
    <p>Click counter so far {{clickCounter}}</p>
    <span>Up dating numbers by clicking button on the child</span>
    <xbutton @increased="increaseValue" click-counter=0 button-text="Click"></xbutton>
  </div>
</template>

<style scoped>

    h1{
        
        font-size:12pt;
        font-family: 'ubuntu'
    
    }

</style>
