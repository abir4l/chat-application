<script>
import chatBox from "../components/ChatBox.vue";
import nav from "../components/Navigation.vue";
import chatService from "../services/ChatService";
import {mapGetters} from 'vuex';
import config from '../config.js';
import store from '../store/store';
import Peer from 'peerjs';

export default {
    components:{ 'chat-box':chatBox ,'navigation':nav},
    data: function() {
     return {
        pageTitle : " ",
        showVideoScreen: false,
        myPeer: null,
        myPeerId: '',
        remotePeerId: '',
        raf: null,
        remoteMute: false,
        videoMute: false
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
    methods: {
        goBack: function() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        },
        chatListener: async function(message,loaded) {
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            await chatService.sendMessage({
                reciever:reciever,
                sender:sender,
                message:message,
                type:1
            });
            /**
             * The data will be sent from the socket now
             * hence no need to get data back on call
             */
            // this.$store.dispatch("loadChat",history.data);
            loaded(true);
        },
        videoListener: async function() {
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            let self = this;
            await chatService.sendMessage({
                reciever:reciever,
                sender:sender,
                message:"Video Call",
                type: 2
            });
            chatService.metaMessage({
                reciever:reciever,
                sender:sender,
                message: self.myPeer.id
            }).then(function() {
                config.log({
                    reciever:reciever,
                    sender:sender,
                    message: self.myPeer.id
                });
                config.log('sent with id ' + self.myPeer.id);
            });
        },
        handleRemoteHangup: function() {
            // Session terminated
            this.stop();
        },
        stop: function() {
            this.showVideoScreen = false;
            // releasing webcam and microphone
            [this.$refs.video, this.$refs.remote].forEach(vid => {
                if(!vid.srcObject) return;
                let stream = vid.srcObject;
                vid.pause();
                vid.srcObject = null;
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            });
        },
        hangup: function() {
            // Hanging up
            this.stop();
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            chatService.metaMessage({
                reciever:reciever,
                sender:sender,
                message: 'bye'
            });
        },
        muteVideo: function() {
            this.videoMute = !this.videoMute;
            this.$refs.video.muted = this.videoMute;
        },
    },
    beforeRouteLeave: function(to, from, next) {
        if (from.path == "/user/chat") {
            this.$store.dispatch("clearSender");
        }
        next(true);
    },
    mounted: async function(){
        let reciever = this.$route.params.username;
        chatService.chatHandshake(this.userData.username);
        let data = await chatService.loadMessages(reciever,this.userData.username);
        this.$store.dispatch("loadChat",data);
        let self = this;
        window.mysocket.on("meta-message", (message) => {
            if (message === 'got user media') {
            } else if (message.type === 'offer') {
            } else if (message.type === 'answer') {
            } else if (message === 'bye') {
                self.handleRemoteHangup();
            } else {
                config.log('maybe reciever peer id');
                config.log(message);
                self.remotePeerId = message;
                self.connection = self.myPeer.connect(self.remotePeerId)
                config.log(self.connection, 'Now connected')
                self.connection.on('open', () => {
                    self.connection.on('data', newMessage => {
                        config.log(newMessage);
                    });
                    self.connection.send('videocall-ready|' + self.myPeer.id);
                });
            }
        });
    },
    created: function() {
        let self = this;
        window.onbeforeunload = function() {
            // self.hangup();
        };
        this.myPeer = new Peer()
        this.myPeer.on('open', (id) => {
            config.log('this.myPeer.id: ' + this.myPeer.id + ' this.myPeer.key: ' + this.myPeer.key)
        })
        // Receive messages
        this.myPeer.on('connection', con => {
            config.log("Receiving messages from peer")
            this.connection = con
            con.on('open', () => {
                con.on('data', newMessage => {
                    var parts = newMessage.split('|');
                    if(parts[0] == 'videocall-ready') {
                        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                        getUserMedia({video: true, audio: true}, function(stream) {
                            self.$refs.video.srcObject = stream;
                            self.$refs.video.muted = self.videoMute;
                            config.log("Video calling to " + parts[1]);
                            var call = self.myPeer.call(parts[1], stream);
                            call.on('stream', function(remoteStream) {
                                self.showVideoScreen = true;
                                self.$refs.remote.srcObject = remoteStream;
                                self.$refs.remote.muted = self.remoteMute;
                            });
                        }, function(err) {
                          config.log('Failed to get local stream', 'getUserMedia error');
                        });
                    }
                })
            });
        });
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        this.myPeer.on('call', call => {
            config.log("Receiving video call from peer");
            getUserMedia({video: true, audio: true}, function(stream) {
                self.$refs.video.srcObject = stream;
                self.$refs.video.muted = self.videoMute;
                call.answer(stream);
                call.on('stream', function(remoteStream) {
                    self.showVideoScreen = true;
                    self.$refs.remote.srcObject = remoteStream;
                    self.$refs.remote.muted = self.remoteMute;
                });
            }, function(err) {
                config.log('Failed to get local stream', 'peer call error');
            });
        });
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
                <div class="col-md-6 center-alignment">
                    <h1 class="text-color-red border-top text-center">{{this.$route.params.username}}</h1>
                </div>
            </div>
            <div class="video-call-popup" v-show="showVideoScreen">    
                <video ref="video" class="local" autoplay muted playsinline></video>
                <video ref="remote" class="remote" autoplay muted playsinline></video>
                <div class="btn-wrapper">
                    <button class="hangup" v-on:click="hangup"><i class="fa fa-phone"></i></button>
                    <button class="mute" v-on:click="muteVideo" v-bind:class="{ 'is-muted': videoMute }"><i v-bind:class="[videoMute ? 'fa fa-microphone-slash' : 'fa fa-microphone']"></i></button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 center-alignment">
                    <chat-box ref="chat-box" :chat-history="chatHistory" v-on:chat='chatListener' v-on:video='videoListener'/>
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
.local {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    position: absolute;
    z-index: 1;
}
.remote {
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.btn-wrapper {
    position: absolute;
    left: 50%;
    bottom: 80px;
}
.hangup {
    border: none;
    background: red;
    color: #ffffff;
    border-radius: 100%;
    padding: 10px 16px;
    margin: 10px;
}
.mute {
    border: none;
    background: grey;
    color: #ffffff;
    border-radius: 100%;
    padding: 10px 16px;
}
.video-call-popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    background: rgba(0,0,0,0.5);
}
</style>