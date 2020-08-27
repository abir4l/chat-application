<script>
import but from '../components/Button.vue';


export default {
    
    components:{but},
    data: function(){
     return {

     };
    },
    computed:{

        increment:function(){
            return this.$store.state.count;
        }

    },
    methods:{
        
        countIncrease: function(){
            
            this.$store.commit('increaseHomeButton');
        
        },
        login: function(){
            this.$router.push('/login');
        },
        
    }


}
</script>
<style>

</style>
<template>
    <div class="contents">
        <h1>Home page {{increment}}</h1>
        <button v-on:click='login()'>login</button>
        <div class="wrapper">
            <test/>
            <but @increased="countIncrease">Home Button</but>
        </div>
    </div>
</template>
