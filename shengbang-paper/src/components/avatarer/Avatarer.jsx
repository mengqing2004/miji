import { UserOutlined } from '@ant-design/icons';

import { Avatar, Space } from 'antd';
import React from 'react';
import {useStore} from "@/store/index.js";

function Avatarer() {
    const { userStore } = useStore();
    const { avatar } = userStore.userInfo;
    return (
        <Space direction="vertical" size={14}>
            <Space wrap size={14}>
                <Avatar src={avatar} size={64} icon={<UserOutlined />} />
            </Space>
        </Space>
    );
}

export default Avatarer;