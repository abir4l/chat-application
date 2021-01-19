<script>
import chatBox from "../components/ChatBox.vue";
import chatService from "../services/ChatService";
import {mapGetters} from 'vuex';

export default {

    components:{ 'chat-box':chatBox },
    data: function(){
     return {
        pageTitle : " User chat page"
     };
    },
    computed:{
     ...mapGetters(
        {
            chatStore: 'getChatStore',
            userData: 'getUserState',
            chatHistory: 'getChatHistory',
                   
        })
    },
    methods:{
        
        goBack: function(){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        },
        chatListener: async function(message,something){
            
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            let history = await chatService.sendMessage({
                reciever:reciever,
                sender:sender,
                message:message
            });
            this.$store.dispatch("loadChat",history.data);
            something(true);
        }

    },
    beforeRouteLeave:function(to,from,next){
        if(from.path == "/user/chat"){
            this.$store.dispatch("clearSender");
        }
        next(true);
    },
    mounted: async function(){
        let reciever = this.$route.params.username;
        chatService.chatHandshake(this.userData.username);
        let data = await chatService.loadMessages(reciever,this.userData.username);
        this.$store.dispatch("loadChat",data);
    }

}
</script>
<style>

</style>
<template>
    <div class="contents">
        <h1>{{pageTitle}}</h1>
        <button v-on:click='goBack()'>Back</button>
        <chat-box :chat-history="chatHistory" v-on:chat='chatListener' />
    </div>
</template>
