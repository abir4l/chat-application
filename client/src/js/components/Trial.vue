<script>
import { mapState } from 'vuex';
import xbutton from "./Button.vue";
export default { 

  components:{xbutton},
  computed: mapState({
    
    homeCount: state => state.homeButtonCounter,
    count: 'homeButtonCounter'


  }),
  data: function () {
    return {
      clickCounter:0
    };
  },
  mounted: function () {
  },
  methods: {

      increaseHomeValue:function(ev){
        this.$store.commit('increment');
      },
      increaseValue: function(ev){
          this.clickCounter++;
      }

  },
};
</script>
<template>
  <div class="content">
    <span>Home button counter:: {{count}}</span>
    <p>Click counter so far {{clickCounter}}</p>
    <xbutton @increased="increaseValue" click-counter=0 >Click</xbutton>
    <div style="margin-top:15px">
        <xbutton @increased="increaseHomeValue" click-counter=0>Raise Home counter</xbutton>
    </div>
  </div>
</template>

<style scoped>

    h1{
        
        font-size:12pt;
        font-family: 'ubuntu'
    
    }
    .content{
        font-family:arial;
        color:#FFF;
        background: gray;
        padding:10px;
        margin-top:10px;
        margin-bottom:10px;

    }

</style>
