import React from 'react';
import Avatarer from "../avatarer/Avatarer.jsx";
import {useStore} from "@/store/index.js";
import {removeToken} from "@/utils/index.js";
import {Avatar, Button, message, Popconfirm, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";



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
            <div className={`w-full py-1 flex items-center px-4 space-x-4`}>
                <div className={`flex-shrink-0`}>
                    <Avatar src={userStore.userInfo.avatar} size={44} icon={<UserOutlined />} />
                </div>
                <div className={`w-full flex-grow overflow-hidden space-y-1`}>
                    <h1 className={`truncate font-bold`}>欢迎:{userStore.userInfo.nickName}</h1>
                    <div>
                        <Popconfirm
                            title="退出登录"
                            description="你确定要退出吗?"
                            onConfirm={confirm}
                            okText="退出"
                            cancelText="不了"
                        >
                            <a>
                                <span  className={`text-sm text-blue-500`}>退出登录</span>
                            </a>
                        </Popconfirm>
                    </div>
                    {/*<p className={`text-gray-500`}>前端-程序員</p>*/}
                </div>
            </div>
            <div className={`pl-4 pt-2`}>
                <p className={`text-gray-500 text-sm `}><span className={`text-black`}>职位:</span>{department}{role}</p>
            </div>
        </div>
    );
}

export default UserList;