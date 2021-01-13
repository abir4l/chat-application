import io from 'socket.io-client';
import api from '../lib/api.js';
import config from '../config.js';
import store from '../store/store'
export default{


	chatHandshake : async (username) => {
		
		let response = await api.post(config.url("user/chat/handshake"),{username:username})
		if(response){
			 let ownSocket = io.connect(config.url(username));
             ownSocket.on('message', (data) =>{
                store.dispatch('loadChat',data);
             });
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

	}

	



}