import axios from "axios";
import { getToken,removeToken} from "./token.js";
import {DevBaseURL,ProdBaseURL} from "@/config/index.js";

const http=axios.create({
    baseURL:import.meta.env.DEV?DevBaseURL:ProdBaseURL,
    timeout:6000,
})

// 请求拦截器,添加token
http.interceptors.request.use(
    (config) => {
        const token = getToken();
        if(token){
            config.headers.token=token;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)
//响应拦截器,处理错误

http.interceptors.response.use(
    (response)=>{
        if (response.data.code===2001){
            console.log(response.data,657);
            // removeToken();
        }else {
            return response.data;
        }
    } ,
    (error)=>{
        return Promise.reject(error)
    }
)

export default http;