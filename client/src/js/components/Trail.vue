<script>
import Button from "./Button.vue";

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

      increaseValue: function(){
          this.clickCounter++;
      }

  },
};
</script>
<template>
  <div class="content">
    <h1>Loaded from the vue {{msg}}</h1>  
    <p>Clicks so far {{clickCounter}}</p>
    <Button @increased="increaseValue" click-counter=0 button-text="Abiral"></Button>
  </div>
</template>