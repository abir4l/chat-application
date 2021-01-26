<script>
import chatBox from "../components/ChatBox.vue";
import chatService from "../services/ChatService";
import {mapGetters} from 'vuex';

export default {

    components:{ 'chat-box':chatBox },
    data: function(){
     return {
        pageTitle : " "
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
        chatListener: async function(message,loaded){
            
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            await chatService.sendMessage({
                reciever:reciever,
                sender:sender,
                message:message
            });
            /**
             * The data will be sent from the socket now
             * hence no need to get data back on call
             */
            // this.$store.dispatch("loadChat",history.data);
            loaded(true);
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
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1 class="page-title">{{pageTitle}}</h1>
                    <button v-on:click='goBack()'>Back</button>
                    <chat-box :chat-history="chatHistory" v-on:chat='chatListener' />
                </div>
            </div>
        </div>
        
    </div>
</template>
<style scoped lang="css">
.page-title{
    font-size: 9pt;
    font-family: 'roboto';
}
</style>