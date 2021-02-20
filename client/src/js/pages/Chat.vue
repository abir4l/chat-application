<script>
import chatBox from "../components/ChatBox.vue";
import users from "../components/Users.vue"
import nav from "../components/Navigation.vue";
import chatService from "../services/ChatService";
import {mapGetters} from 'vuex';
import config from '../config.js';
import store from '../store/store';

export default {

    components:{ 'chat-box':chatBox ,'navigation':nav, users:users},
    data: function(){
     return {
        pageTitle : " ",
        isChannelReady: false,
        showVideoScreen: false,
        isStarted: false,
        isInitiator:false,
        localStream: null,
        remoteStream: null,
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
        enableWebcams: async function() {
            let self = this;
            return new Promise((resolve) => {
                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                .then((stream) => {
                    self.localStream = stream;
                    self.$refs.video.srcObject = stream;
                    self.isChannelReady = true;
                    resolve(true);
                })
                .catch(function(e) {
                    console.log(e);
                    alert('getUserMedia() error: ' + e.name);
                });
            });
        },
        videoListener: async function(){
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            let self = this;
            await chatService.sendMessage({
                reciever:reciever,
                sender:sender,
                message:"Video Call",
                type: 2
            });

            navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                console.log(self.$refs);
                self.localStream = stream;
                self.$refs.video.srcObject = stream;

                let reciever = self.$route.params.username;
                let sender = self.$store.getters.getUserState.username;

                chatService.metaMessage({
                    reciever:reciever,
                    sender:sender,
                    message: 'got user media'
                }).then(function() {
                    self.isChannelReady = true;
                    self.showVideoScreen = true;
                    self.isInitiator = true;
                    self.createPeerConnection();
                    self.pc.addStream(self.localStream);
                    self.maybeStart();
                });
            })
            .catch(function(e) {
                console.log(e);
                alert('getUserMedia() error: ' + e.name);
            });

        },
        maybeStart: async function() {
            if(this.localStream == null) {
                await this.enableWebcams();
            }
            console.log('>>>>>>> maybeStart() ', this.isStarted, this.localStream, this.isChannelReady);
            if (!this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady) {
                console.log('>>>>>> creating peer connection');
                this.createPeerConnection();
                this.pc.addStream(this.localStream);
                this.isStarted = true;
                console.log('isInitiator', this.isInitiator);
                if (this.isInitiator) {
                  this.doCall();
                }
            }
        },
        createPeerConnection: function () {
            try {
                this.pc = new RTCPeerConnection(config.turnConfig());
                this.pc.onicecandidate = this.handleIceCandidate;
                this.pc.onaddstream = this.handleRemoteStreamAdded;
                this.pc.onremovestream = this.handleRemoteStreamRemoved;
                console.log('Created RTCPeerConnnection');
            } catch (e) {
                console.log(e);
                return;
            }
        }, 
        handleIceCandidate: function(event) {
            if (event.candidate) {
                let reciever = this.$route.params.username;
                let sender = this.$store.getters.getUserState.username;
                chatService.metaMessage({
                    reciever:reciever,
                    sender:sender,
                    message: {
                        type: 'candidate',
                        label: event.candidate.sdpMLineIndex,
                        id: event.candidate.sdpMid,
                        candidate: event.candidate.candidate
                    }
                });
            }
        },
        handleRemoteStreamAdded: function(event) {
            this.remoteStream = event.stream;
            this.$refs.remote.srcObject = this.remoteStream;
        },
        handleRemoteStreamRemoved: function(event) {
            console.log('Remote stream removed. Event: ', event);
        },
        doCall: function() {
            // Sending offer to peer
            this.pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError);
        },
        doAnswer: function() {
            // Sending answer to peer
            this.showVideoScreen = true;
            this.pc.createAnswer().then(
                this.setLocalAndSendMessage,
                this.onCreateSessionDescriptionError,
                this.answerCall
            );
        },
        setLocalAndSendMessage: function(sessionDescription) {
            this.pc.setLocalDescription(sessionDescription);
            let reciever = this.$route.params.username;
            let sender = this.$store.getters.getUserState.username;
            chatService.metaMessage({
                reciever:reciever,
                sender:sender,
                message: sessionDescription
            });
        },
        onCreateSessionDescriptionError: function(error) {
            console.log('Failed to create session description: ' + error.toString());
        },  
        handleCreateOfferError: function (event) {
          console.log('createOffer() error: ', event);
        },
        answerCall: function() {
            this.showVideoScreen = true;
        },
        handleRemoteHangup: function() {
            // Session terminated
            this.stop();
            this.isInitiator = false;
        },
        stop: function() {
            this.isStarted = false;
            this.showVideoScreen = false;
            if (this.pc != null) {
                this.pc.close();
                this.pc = null;
            }
            this.localStream.getTracks().forEach(function(track) {
                if (track.readyState == 'live') {
                    track.stop();
                }
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
        let self = this;
        window.mysocket.on("meta-message", (message) => {
            console.log('Client received message:', message);
            if (message === 'got user media') {
                self.maybeStart();
            } else if (message.type === 'offer') {
                if (!self.isInitiator && !self.isStarted) {
                    self.maybeStart();
                }
                self.pc.setRemoteDescription(new RTCSessionDescription(message));
                self.doAnswer();
            } else if (message.type === 'answer' && self.isStarted) {
                self.pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && self.isStarted) {
                if (self.pc != null) {
                    var candidate = new RTCIceCandidate({
                        sdpMLineIndex: message.label,
                        candidate: message.candidate
                    });
                    self.pc.addIceCandidate(candidate);
                }
            } else if (message === 'bye' && self.isStarted) {
                self.handleRemoteHangup();
            }
        });
    },
    created: function() {
        let self = this;
        window.onbeforeunload = function() {
            // self.hangup();
        };
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
                     <users></users>
                </div>
                <div class="col-md-8">
                    <h1 class="text-color-red border-top text-center">{{this.$route.params.username}}</h1>
                    <chat-box :chat-history="chatHistory" v-on:chat='chatListener' />
                </div>
            </div>
            <div class="video-call-popup" v-show="showVideoScreen">    
                <video ref="video" class="local" autoplay muted playsinline></video>
                <video ref="remote" class="remote" autoplay muted playsinline></video>
                <button class="hangup" v-on:click="hangup"><i class="fa fa-phone"></i></button>
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
.hangup {
    position: absolute;
    border: none;
    background: red;
    color: #ffffff;
    border-radius: 100%;
    padding: 10px 16px;
    left: 50%;
    bottom: 80px;
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