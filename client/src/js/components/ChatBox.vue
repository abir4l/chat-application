<script>
  import xbutton from "./Button.vue";
  import {mapActions} from 'vuex';
  import moment from 'moment';
  export default {
    name: "chat-box",
    components: { xbutton },
    props: ["chatHistory"],
    computed: {
   
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
      ...mapActions(["loadUserList"]),
      moment: function (date) {
        return moment(date);
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
  mounted: function () {
    // this.getUserList();
    this.loadUserList();
  },

};
</script>

<template>
  <div class="chat-wrapper" style="padding: 5px 0 0 0;">
    <div class="chat-history">
      <div class="chat-contents">
        <div class="chat-message-block" v-bind:class="[{ 'chat-message-from': chat.type === 'from'},{'chat-message-to' : chat.type === 'to' }]" v-for="chat in chatHistory" v-bind:key="chat._id">
          <div class="sender-info"></div>
          <div class="chat-message-content">
            <p v-html="escapedMessage(chat.message)"></p>
          </div>
          <p class="chat-timing">{{moment(chat.timestamp.toLocaleString()).format('YYYY-MM-DD HH:mm:ss')}}</p>
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
  .chat-contents{
    height: 600px;
    overflow-y: scroll;
  }

</style>
