<script>
import chatBox from "../components/ChatBox.vue";
export default {

    components:{ 'chat-box':chatBox },
    data: function(){
     return {
        pageTitle : " User chat page"
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
        <h1>{{pageTitle}}</h1>
        <button v-on:click='goBack()'>Back</button>
        <chat-box/>
    </div>
</template>
