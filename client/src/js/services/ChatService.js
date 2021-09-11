import io from 'socket.io-client';
import api from '../lib/authApi';
import config from '../config.js';
import store from '../store/store';
export default{
	ownSocket:null,
	username:'',
	api:null,
	disconnected(reason){
		if(reason === 'transport close'){
			this.api.post(config.url("user/chat/handshake"),{username:this.username})
			.then(resp=>{
				if(resp){
					this.ownSocket.connect();
					store.dispatch("addSocketData",this.ownSocket.id);
				}
			}).catch(error =>{
				console.log(error);
			});
		}
	},
	async chatHandshake(username){
		this.api = api;
		this.username = username;
		let response = await api.post(config.url("user/chat/handshake"),{username})
		if (response) {
			this.ownSocket = io.connect(config.url(username));
			this.ownSocket.on("testingsocket",(data)=>{
				console.log('testing data',data);
			});
            this.ownSocket.on('message', (data) =>{
                store.dispatch('loadChat',data);
			});
			let binded = this.disconnected.bind(this);
			this.ownSocket.on('disconnect',binded);
			store.dispatch("addSocketData",this.ownSocket.id);
			window.mysocket = this.ownSocket;
		}
	},
	loadMessages:async(reciever,username)=>{
		let chatInfo= {reciever:reciever,sender:username};
		let response = await api.post(config.url("user/chat/load-message"),chatInfo);
		return response.data;	
	},
	sendMessage: async (chatInfo)=> {
		let response = await api.post(config.url("user/chat/send-message"),chatInfo);
		return  response.data;
	}, 
	metaMessage: async (data)=> {
		await api.post(config.url("user/chat/meta-message"), data);
	}, 
}