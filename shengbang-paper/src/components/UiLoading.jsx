import React from 'react';
import {Spin} from "antd";

function UiLoading() {
    return (
        <div className={`flex justify-center items-center`}>
            <Spin tip={'加载中'}/>
        </div>
    );
}

export default UiLoading;