import React, {useEffect, useState} from 'react';
import {Button, message} from "antd";
import Avatarer from "../avatarer/Avatarer.jsx";
import {getToken,removeToken} from "@/utils/index.js";
import {useNavigate} from "react-router-dom";
import {useStore} from "@/store/index.js";
function Logined() {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const { userStore } = useStore();
    const { nickname } = userStore.userInfo;
    const [loading, setLoading] = useState(false);
    function proving (){
        setLoading(true)
        if (getToken().length>0){
            setTimeout(()=>{
                navigate("/", { replace: true });
                setLoading(false)
            },500)
        }else {
            messageApi.error({ key: "login", content: '登录验证已过期' });
            setTimeout(()=>{
                remove()
            },1500)
        }
    }
    function remove(){
        removeToken()
        setLoading(true)
        setTimeout(()=>{
            navigate("/", { replace: true });
            setLoading(false)
        },1500)
    }
    return (
        <div className={`text-center `}>
            {contextHolder}

                <button
                    onClick={proving}
                    className={`w-auto h-auto`}
                >
                    <div className={`w-auto mx-auto`}>
                        <Avatarer/>
                    </div>
                </button>

            <p className={`text-sm pt-2`}>欢迎 {nickname}</p>

            <p className={`py-8 font-bold text-lg `}>点击头像可继续使用该账户</p>
            <Button
                className={`w-1/3`}
                type='primary'
                onClick={remove}
                loading={loading}
            >
                切换账号
            </Button>
        </div>
    );
}

export default Logined;