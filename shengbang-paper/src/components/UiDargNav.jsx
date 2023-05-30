import React, {useEffect} from 'react';
import {Breadcrumb, Button} from "antd";
import CreateNewList from "@/components/content/subject/CreateNewList.jsx";

function UiDargNav({navTitle,newList,title,isButton}) {
    const data=[]
    if (title!=undefined||title!=null){
        data.push({title})
    }
    if(navTitle){
        data.push({
            title: navTitle+'列表',
        })
    }
    return (
        <>
            {navTitle?
                <div className={`flex w-full justify-between items-center px-4 py-2`}>
                    <div className={`py-4`}>
                        <Breadcrumb
                            items={data}
                        />
                    </div>
                    {isButton?<CreateNewList navTitle={navTitle} newList={newList} />:''}
                </div>:''}
        </>
    );
}

export default UiDargNav;