// axious helps to send request or getrequest
import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.29.106:3000" // the API (cloud function) URL
})

export default instance;
