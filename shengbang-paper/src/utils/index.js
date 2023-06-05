import {EncryptSalt} from "../config/index.js";
import md5 from "md5";

// 模块化的工具函数
import {setToken,getToken,removeToken} from "./token.js";
import http from "./http.js"
export {http,setToken,getToken,removeToken}

/**
 * 加密函数
 * @param value 需要加密的字符串
 * @returns 加密后的字符串
 * **/
export  const  encrypt=(value)=>{
    return md5(md5(value)+EncryptSalt)
}


/**
 * Store获取数据的工具函数 run
 * @param _this
 * @param runInAction
 * @param promise
 * @returns {*}
 */
import { runInAction } from "mobx";

export const run=(_this, promise)=>{
    if (!promise|| !promise.then){
        throw new Error("run 必须传入Promise")
    }

    runInAction(()=>{
        _this.isLoading=true;
    })

    return promise
        .then((res)=>{
            if (res.code === 200){
                return res;
            }else {
                return Promise.reject(res.message)
            }
        })
        .finally(()=>{
            runInAction(()=>{
                _this.isLoading=false;
            })
        })
}
