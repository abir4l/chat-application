const serverUrl = process.env.SERVER_URL;
const captchaSiteKey = process.env.CAPTCHA_SITEKEY;
export default {
    url: (path) => {
    	var url = serverUrl + path,
    	/** 
    	* This is done because in live, server is using reversed proxy 
    	* and /proxy is the entry point for the server
    	* we need to remove this in order to support for socket.io
    	*/
    	url = url.replace('/proxy','');
    	return url;
    },
    log: (message, tag, mode) => {
        var tag = (typeof tag == 'undefined' ? 'log' : tag);
        var mode = (typeof mode == 'undefined' ? 'dev' : mode);
        if (mode == process.env.APP_ENV) {
            if (typeof message == 'string') {
                console.log("TAG: " + tag.toUpperCase() + ", " + "MESSAGE: " + message);    
            } else {
                console.log("TAG: " + tag.toUpperCase())
                console.log(message);
            }
        }
    },
    appEnv: (env) => {
        return process.env.APP_ENV == env;
    },
    captchaSiteKey: () => captchaSiteKey,
}