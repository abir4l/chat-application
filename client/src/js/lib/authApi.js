import Axios from 'axios';

let axiosInstance = Axios.create({});


axiosInstance.interceptors.request.use(
    async (request)  =>{
        let data = await Axios.get('http://localhost:8888/test');
        let url = request.url;
        url  = url.substr(0,url.indexOf('jquery'));
        url = url + data.data.new_token;
        request.url = url;
        return request;
    }, error => Promise.reject(error)
);

export default axiosInstance;