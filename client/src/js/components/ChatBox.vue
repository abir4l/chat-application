<script>
import xbutton from "./Button.vue";
export default {
  name: "chat-box",
  components: { xbutton: xbutton },
  props: [],
  computed: {},
  filters: {
    nl2br: function (value) {
      return value.replace("\n", "<br>");
    },
  },
  mounted: function () {
    this.$refs["chat-box"].focus();
  },
  methods: {
    escapedMessage: function (data) {
      return this.$sanitize(data.replaceAll("\n", "<br>"));
    },
    enterPressed: function (event) {
      if (event.keyCode == 13 && !event.shiftKey) this.sendMessage(); // 13 is the carriage retun key
    },
    sendMessage: function () {
      // validations here for empty messages
      //axios to send to server here
      this.sendingChat = true;
      setTimeout(() => {
        if (this.chatMessage.trim().length == 0) {
          // console.error("empty chat box");
          return;
        }
        this.chatHistory.push(this.chatMessage);
        this.chatMessage = "";
        this.sendingChat = false;
        this.$refs["chat-box"].focus();
      }, 2000);
    },
  },
  data: function () {
    return {
      chatMessage: "",
      chatHistory: [],
      sendingChat: false, //loading button for sending chat
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="chat-history">
      <div class="chat-contents">
        <div class="chat-message-block" v-for="chat in chatHistory">
          <div class="sender-info"></div>
          <div class="chat-message-content">
            <p v-html="escapedMessage(chat)"></p>
          </div>
          <p class="chat-timing">Timestamp</p>
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
  background: #ccc;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
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
  background: #6565e0;
  color: white;
}
</style>
