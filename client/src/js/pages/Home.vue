<script>
export default {

    data: function(){
     return {

     };
    },
    methods:{
        
        login: function(){
            this.$router.push('/login');
        }

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
