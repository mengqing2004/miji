import React, {useState} from 'react';
import Logo from "../components/layout/Logo.jsx";
import UserList from "../components/layout/UserList.jsx";
import Columns from "../components/layout/Columns.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <div className={`w-full h-[100vh] flex border overflow-hidden`}>
                <div className={`w-52 h-full border flex flex-col flex-shrink-0`}>
                    {/*左侧用户数据和分类*/}
                    <Logo/>
                    <UserList/>
                    <Columns/>
                </div>
                <div className={`flex-grow h-full`}>
                    {/*右侧数据列表*/}
                    <div>
                        <Outlet />
                    </div>
                    {/*<div>*/}
                        {/*{columnsList[columns-1].content}*/}
                        {/*<Subject/>*/}
                        {/*<Question/>*/}
                        {/*<Paper/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

export default Layout;