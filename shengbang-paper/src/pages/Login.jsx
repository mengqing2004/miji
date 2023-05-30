import React, {useEffect, useState} from 'react';
import { Card,} from "antd";
import {getToken} from "../utils/index.js";
import Logined from "../components/login/Logined.jsx";
import LoginFrom from "../components/login/LoginFrom.jsx";
import  {useStore} from "../store/index.js";

function Login() {
    const { userStore } = useStore();
    const [count,setCount]=useState('')
    useEffect(()=>{
        console.log(getToken())
        if (getToken().length>0){
            // TODO 这里缺少loading，应该统一封装loading
            userStore.getUserInfoFromApi().then(() => {
                setCount(<Logined/>)
            });
        }else {
            setCount(<LoginFrom/>)
        }
    },[])
    return (
        <div className={`p-4`}>
            <Card>
                <p className={`font-bold text-xl text-center mb-12`}><span className={`text-blue-500`}>盛邦</span>试卷管理系统</p>
                {count}
            </Card>
        </div>
    );
}

export default Login;