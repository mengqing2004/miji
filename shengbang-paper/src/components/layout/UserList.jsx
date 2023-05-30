import React from 'react';
import Avatarer from "../avatarer/Avatarer.jsx";
import {useStore} from "@/store/index.js";
import {removeToken} from "@/utils/index.js";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";



function UserList() {
    const { userStore } = useStore();
    const { nickname,department,role } = userStore.userInfo;
    const navigate = useNavigate();
    function remove(){
        removeToken()
        navigate("/login", { replace: true });
    }
    // console.log(userStore.userInfo)
    return (
        <div>
            <div className={`w-full h-32 flex items-center px-4 space-x-4`}>
                <div className={`flex-shrink-0`}>
                    <Avatarer/>
                </div>
                <div className={`w-full flex-grow overflow-hidden`}>
                    <h1 className={`truncate font-bold`}>{nickname}</h1>
                    <p className={`text-gray-500`}>{department}-{role}</p>
                    {/*<p className={`text-gray-500`}>前端-程序員</p>*/}
                </div>
            </div>
            <Button type='primary' onClick={()=>remove()} className={`w-full`}>退出登录</Button>

        </div>
    );
}

export default UserList;