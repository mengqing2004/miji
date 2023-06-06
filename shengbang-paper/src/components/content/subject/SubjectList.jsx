import React, {useEffect, useState} from "react";
import {Link, NavLink, useParams, useSearchParams} from "react-router-dom";
import { Button, message, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import UiDargTable from "@/components/UiDargTable.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import UiDargNav from "@/components/UiDargNav.jsx";
import useAsync from "@/hooks/useAsync.js";
import {subjectApi} from "@/api/index.js";
import {v4 as uuid} from 'uuid'
import {useStore} from "@/store/index.js";
import {arrayMove} from "@dnd-kit/sortable";

function SubjectList() {
    let [searchParams, setSearchParams] = useSearchParams();
   const {subjectStore}=useStore()
    useEffect(()=>{
        subjectStore.getSubjectsList()
    },[])
    const params = useParams();

    const onDragEnd = (subjectList) => {
        console.log(subjectList, "拖拽排序结束");
        subjectStore.sortSubjeft(subjectList)
    };
    const onRename = (subjectList) => {
        console.log(subjectList, "修改命名");
        subjectStore.renameSubject({
            subjectId:subjectList.subjectId,
            subjectName:subjectList.subjectName
        })

    };

    const confirm = (subjectId) => {
        subjectStore.deleteSubject(subjectId)
    };


    const navTitle='科目'
    const isButton='true'
    const newList=(subjectName)=>{
        subjectStore.addSubject(subjectName)
        console.log('新建'+navTitle,subjectName)
    }
    const handleChange=(param)=>{
        if (param.value){
            console.log(param.name,param.value,66666)
            searchParams.set(param.name,param.value);
        }else {
            searchParams.delete(param.name)
        }
        setSearchParams(searchParams)
    }
    const columns = [
        {
            key: "sort",
            width: "10%",
        },
        {
            editable: true,
            ellipsis: true,
            dataIndex: "subjectName",
            render: (text, record) => (
                <Link to={`/subject/${record.subjectId}?subjectName=${text}`}>
                    <p
                        className={`flex-grow truncate  py-2 ${
                            params.subjectId === record.subjectId
                                ? `text-blue-500 font-medium`
                                : `text-gray-500 `
                        }`}
                        // onClick={()=> {
                        //     handleChange({name:"subjectName",value:record.subjectName})
                        // }}
                    >
                        {text}
                    </p>
                </Link>
            ),
        },
        {
            width: "10%",
            render: (text, record) =>
                record.allowDelete === 1 &&(
                    <p className={`flex items-center justify-center text-gray-500 `}>
                        <Popconfirm
                            title="是否删除?"
                            description="你真的要删除它吗?"
                            onConfirm={() => confirm(record.subjectId)}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type="link">
                                <DeleteOutlined/>
                            </Button>
                        </Popconfirm>
                    </p>
                ),
        },
    ];

    return (
        <div className={`flex flex-col h-full`}>
            <div className={`flex-shrink-0`}>
                <UiDargNav navTitle={navTitle} newList={newList} isButton={isButton}/>
            </div>
            <div className={`flex-grow h-full overflow-hidden w-full`}>
                <UiScrollContent>
                    <UiDargTable
                        data={subjectStore.subjectsList}
                        columns={columns}
                        handleDragEnd={onDragEnd}
                        loading={subjectStore.isLoading}
                        handleRename={onRename}
                    />
                </UiScrollContent>
            </div>
        </div>
    );
}

export default observer(SubjectList);
