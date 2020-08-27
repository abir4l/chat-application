<script>


export default {
    
	component:{},
    data: function(){
     return {

     };
    },
    computed:{
    },
    methods:{
        
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
        <h1>Home page</h1>
        <button v-on:click='login()'>login</button>
    </div>
</template>
