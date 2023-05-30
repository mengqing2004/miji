import React from 'react';
import {Breadcrumb} from "antd";
import CreateNewList from "@/components/content/subject/CreateNewList.jsx";
import UiDargNav from "@/components/UiDargNav.jsx";


function UiScrollContent({children}) {
    // console.log(children)
    return (

            <div className={`flex-grow h-full overflow-hidden flex flex-col w-full  `}>
                <div className={`flex-grow overflow-y-auto w-full h-0`}>
                    {children}
                </div>
            </div>




    );
}

export default UiScrollContent;