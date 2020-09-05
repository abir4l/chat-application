<script>
import xbutton from "./Button.vue";
export default {
  name:'chat-box',
  components:{'xbutton':xbutton},
  props: [],
  mounted: function () {

  },
  methods: {
    
        sendMessage: function(){
            // validations here for empty messages
            //axios to send to server here

            setTimeout(()=>{
                this.sendingChat = false;
                
},200);
            if(this.chatMessage.trim().length == 0){
                console.error("empty chat box");
                return;
    
            }
            this.chatHistory.push(this.chatMessage);
            this.chatMessage = "";

        }
  },
  data: function () {
    return { 
        
        chatMessage:'',
        chatHistory:[],
        sendingChat:false,//loading button for sending chat
        
    };
  },
};
</script>

<template>
  <div class="container">
      <div class="chat-history">
            <div class="chat-contents">
                <div class="chat-message-block" v-for="chat in chatHistory">
                    <div class="sender-info">
                    </div>
                    <div class="chat-message-content">
                        {{chat}}
                    </div>
                    <span class="chat-timing">Timestamp</span>

                </div>
            
            </div>
      </div>
      <div class="chat-action">
        <textarea id="message" v-model="chatMessage" name="" cols="30" rows="5"></textarea>
        <xbutton @clicked="sendMessage()" loading="sendingChat">Send</xbutton>
      </div>
  </div>
</template>

<style scoped lang="css">

.chat-message-block{
    margin:10px 0;
}
.chat-history{

    min-height:200px;
    max-height:200px;
    overflow-y:scroll;
    margin-bottom:10px;
    min-width: 500px;
    max-width:500px;
    border: 1px solid #ccc;
}
.container{
    margin-top:10px;
}
textarea{
}
.chat-action{
    
    display:flex;
    flex-direction:column;
    width:500px
}
button._button {
    border: 1px solid #ccc;
    padding: 5px 10px;
    background: #6565e0;
    color: white;
}

</style>
