<script>
  import xbutton from "./Button.vue";
  import {mapGetters} from 'vuex';
  import moment from 'moment';
  export default {
    name: "chat-box",
    components: { xbutton: xbutton },
    props: [],
    computed: {
    ...mapGetters(
        {
            chatHistory: 'getChatHistory',
        })
    },
    filters: {
      nl2br: function (value) {
        return value.replace("\n", "<br>");
      },
    },
    mounted: function () {
      this.$refs["chat-box"].focus();
    },

    methods: {
      moment: function () {
        return moment();
      },
      escapedMessage: function (data) {
        return this.$sanitize(data.replaceAll("\n", "<br>"));
      },
      enterPressed: function (event) {
      if (event.keyCode == 13 && !event.shiftKey) this.sendMessage(); // 13 is the carriage retun key
    },
    sendMessage: function () {
      // validations here for empty messages
       this.sendingChat = true;
        if (this.chatMessage.trim().length == 0) {
          // console.error("empty chat box");
          return;
        }
       
        // this.chatHistory.push(this.chatMessage);
        this.$emit("chat",this.chatMessage,(done)=>{
            
            this.chatMessage = "";
            this.sendingChat = false;
            this.$refs["chat-box"].focus();    

        });
     
    },
  },
  
  data: function () {
    return {
      chatMessage: "",
      sendingChat: false, //loading button for sending chat
    };
  },

};
</script>

<template>
  <div class="container">
    <div class="chat-history">
      <div class="chat-contents">
        <div class="chat-message-block" v-bind:class="[{ 'chat-message-from': chat.type === 'from'},{'chat-message-to' : chat.type === 'to' }]" v-for="chat in chatHistory" v-bind:key="chat._id">
          <div class="sender-info"></div>
          <div class="chat-message-content">
            <p v-html="escapedMessage(chat.message)"></p>
          </div>
          <p class="chat-timing">{{moment(chat.timestamp).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </div>
      </div>
    </div>
    <div class="chat-action">
      <textarea
      :disabled="sendingChat"
      ref="chat-box"
      id="message"
      v-model="chatMessage"
      name
      cols="30"
      rows="5"
      v-on:keyup="enterPressed"
      ></textarea>
      <xbutton @clicked="sendMessage()" :loading="sendingChat">Send</xbutton>
    </div>
  </div>
</template>

<style scoped lang="css">
  .chat-message-block {
    border-radius: 4px;
    margin: 10px;
    padding: 10px;
    width:50%
  }
  .chat-message-from{
    background: #ccc;
    float:left
  }
  .chat-message-to{
    background: rgb(240, 96, 96);
    float:right
  }
  .chat-history {
    min-height: 500px;
    max-height: 500pxpx;
    overflow-y: scroll;
    margin-bottom: 10px;
    border: 3px solid #ccc;
  }
  .container {
    margin-top: 10px;
  }
  textarea#message {
    border-radius: 10px;
    resize: none;
  }
  .chat-action {
    display: flex;
    flex-direction: column;
  }
  p.chat-timing,
  .chat-message-content p {
    margin: 10px;
  }

  p.chat-timing {
    font-size: 9pt;
  }
  button._button {
    border: 1px solid #ccc;
    padding: 5px 10px;
    background: #49498a;
    color: white;
  }
</style>
