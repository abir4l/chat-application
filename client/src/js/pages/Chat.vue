<script>
import chatBox from "../components/ChatBox.vue";
import users from "../components/Users.vue"
import nav from "../components/Navigation.vue";
import chatService from "../services/ChatService";
import {mapGetters} from 'vuex';

export default {

    components:{ 'chat-box':chatBox ,'navigation':nav, users:users},
    data: function(){
     return {
        pageTitle : " ",
     };
    },
    computed:{
     ...mapGetters(
        {
            chatStore: 'getChatStore',
            userData: 'getUserState',
                   
        }),
        messages:function(){
            let messages = this.$store.getters.getChatMessages.find(m => m.reciever === this.$route.params.username )
            let history = messages ? messages.data :[];
            return history;
        }

    },
    methods:{
        chat:function(){

        },
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
        this.$store.dispatch("addChatMessages",data);
    }

}
</script>
<style>

</style>
<template>
    <div class="contents">
        <div class="container">
            <div class="row">
                <div class="col-md-6 center-alignment">
                    <navigation></navigation>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-4">
                     <users @chat=""></users>
                </div>
                <div class="col-md-8">
                    <h1 class="text-color-red border-top text-center">{{this.$route.params.username}}</h1>
                    <chat-box :chat-history="messages" v-on:chat='chatListener' />
                </div>
            </div>
            <div class="row">
                 
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