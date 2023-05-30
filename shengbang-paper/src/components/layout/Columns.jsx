import React, { useState} from 'react';

import {Link, NavLink,} from "react-router-dom";
import {  Menu, theme } from 'antd';
import Sider from "antd/es/layout/Sider.js";
import {navList} from '@/router/index.jsx'

function Columns() {



    return (
        <div className={`w-full flex-grow px-1`}>

                    <ul className={` py-10 space-y-1`}>

                            {navList.map((item)=>(
                                <li key={item.path}>
                                    <NavLink to={item.path}
                                             className={({ isActive, isPending }) =>
                                                 `flex h-full hover:bg-gray-200 rounded-lg py-4 ${
                                                     isActive && `text-blue-500 bg-blue-50`
                                                 }`
                                             }
                                    >
                                        <li className={
                                            `flex pl-6 text-xl items-center space-x-4 w-full h-full rounded-lg `
                                        }>
                                            {item.icon}
                                            <p>{item.content}</p>
                                        </li>
                                    </NavLink>
                                </li>

                            ))}

                    </ul>

        </div>
    );
}

export default Columns;