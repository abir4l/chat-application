<script>
export default {

    data: function(){
     return {

     };
    },
    methods:{
        
        goBack: function(){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        }

    }


}
</script>
<style>

</style>
<template>
    <div class="contents">
        <h1>Login page</h1>
        <button v-on:click='goBack()'>Back</button>
    </div>
</template>
