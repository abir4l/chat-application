// const serverUrl = 'http://localhost:8888/';
const serverUrl = 'http://127.0.0.1:8888/';
// const serverUrl = "https://5f8e66ad6563.ngrok.io/";
const captchaSiteKey = '6LdIYVUaAAAAAOlshMCsFYXjiScnojmNQXj1lMDt';
export default {
    url: (path) =>serverUrl + path,
    captchaSiteKey: () => captchaSiteKey,
    turnConfig: () => {
		iceServers: [
			{
				urls: [ "stun:ms-m1.xirsys.com" ]
			}, 
			{   
				username: "UjFFTYZQecsUzy8yPz7m7uiBiA0R9Hp58S_ntJubsvAKmYD-VWQTLEQclOM0TKHuAAAAAGAtLW1iaW5vZHBhcml5YXI=",   
				credential: "9bf327e8-712f-11eb-9bbe-0242ac140004",   
				urls: [      
					"turn:ms-m1.xirsys.com:80?transport=udp",      
					"turn:ms-m1.xirsys.com:3478?transport=udp",      
					"turn:ms-m1.xirsys.com:80?transport=tcp",      
					"turn:ms-m1.xirsys.com:3478?transport=tcp",      
					"turns:ms-m1.xirsys.com:443?transport=tcp",       
					"turns:ms-m1.xirsys.com:5349?transport=tcp"   
				]
			}
		]
	}
}
