<script>
  import xbutton from "./Button.vue";
  import {mapGetters} from 'vuex';
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
    videoCall: function () {
      this.$emit("video");
    }
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
  <div class="chat-wrapper" style="padding: 5px 0 0 0;">
    <div class="chat-history">
      <div class="chat-contents">
        <div class="chat-message-block" v-bind:class="[{ 'chat-message-from': chat.type === 'from'},{'chat-message-to' : chat.type === 'to' }]" v-for="chat in chatHistory" v-bind:key="chat._id">
          <div class="sender-info"></div>
          <div class="chat-message-content">            
            <p><i class="fa fa-video-camera" v-if="chat.message_type == '2'"></i> <span v-html="escapedMessage(chat.message)"></span></p>
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
      <div class="row">
        <div class="col-md-12 d-flex">
          <button v-on:click="videoCall()" class="btn btn-primary"><i class="fa fa-video-camera"></i></button>
          <xbutton @clicked="sendMessage()" :loading="sendingChat" :class="'flex-grow-1'">Send</xbutton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  

</style>
