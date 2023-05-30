// http://127.0.0.1:4523/m1/2576757-0-default
import {makeAutoObservable,runInAction} from "mobx";
import {userApi} from  "@/api";
import {setToken,getToken,encrypt} from "@/utils/index.js";


class UserStore{
    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
    }
    token=getToken() || "";
    userInfo= {};
    /*
    * 用户登录
    * @param username
    * @param password
    * @returns {Promise<never>}
    * */

    login=async ({username,password})=>{
        try {
            password=encrypt(password );
            const res=await userApi.login({
                username,password
            })
            if (res.code===200){
                // console.log(res.data)

                runInAction(()=>{
                    this.token=res.data.token;
                })
                setToken(this.token)
            }else {
                return Promise.reject(res.message)
            }
        } catch (e){
            return  Promise.reject(e.message)
        }
    }
    /**
     * 获取用户信息
     * @returns {Promise<*>}
     */
    getUserInfoFromApi=async ()=>{
        try {
            const res=await userApi.getUserInfo();
            if (res.code===200){
                runInAction(()=>{
                    this.userInfo=res.data;
                })
            }else {
                return Promise.reject(res.message)
            }
        } catch (e){
            return Promise.reject(e.message);
        }
    }
}

export default  UserStore;