import React from 'react';
import Avatarer from "../avatarer/Avatarer.jsx";
import {useStore} from "@/store/index.js";
import {removeToken} from "@/utils/index.js";
import {Button,message, Popconfirm} from "antd";
import {useNavigate} from "react-router-dom";



function UserList() {
    const { userStore } = useStore();
    const { nickname,department,role } = userStore.userInfo;
    const navigate = useNavigate();
    function remove(){
        removeToken()
        navigate("/login", { replace: true });
    }
    const confirm = () => {
        remove()
    };

    // console.log(userStore.userInfo)
    return (
        <div>
            <div className={`w-full py-4 flex items-center px-4 space-x-1`}>
                <div className={`flex-shrink-0`}>
                    <Avatarer/>
                </div>
                <div className={`w-full flex-grow overflow-hidden text-center`}>
                    <h1 className={`truncate font-bold`}>欢迎:{userStore.userInfo.nickName}</h1>

                    {/*<p className={`text-gray-500`}>前端-程序員</p>*/}
                </div>
            </div>
            <div className={`pl-4`}>
                <p className={`text-gray-500 text-sm `}><span className={`text-black`}>职位:</span>{department}{role}</p>
                <div className={`text-left`}>
                    <Popconfirm
                        title="退出登录"
                        description="你确定要退出吗?"
                        onConfirm={confirm}
                        okText="退出"
                        cancelText="不了"
                    >
                        <Button danger type='link'>
                            <span  className={`text-sm`}>退出登录</span>
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
}

export default UserList;