import React from 'react';
import {useStore} from "@/store/index.js";
import UiLoading from "@/components/UiLoading.jsx";

import {LeftOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
function UiPaperBack({isLoading,children}) {
    return (
        <>{isLoading?
            <>
                <UiLoading/>
            </>:
            <div className={`flex flex-col h-full`}>
                <div className={`flex-shrink-0`}>
                    <Link to={'/paper'}>
                        <div className={`flex items-center space-x-1 text-blue-500`}>
                            <LeftOutlined/>
                            <p className={`text-sm`}>返回试卷列表</p>
                        </div>
                    </Link>
                </div>
                <div className={`flex-grow`}>
                    {children}
                </div>
            </div>
        }
        </>
    );
}

export default observer(UiPaperBack);