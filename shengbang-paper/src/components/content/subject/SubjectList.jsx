import React, {useEffect, useState} from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import { Button, message, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import UiDargTable from "@/components/UiDargTable.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import UiDargNav from "@/components/UiDargNav.jsx";
import useAsync from "@/hooks/useAsync.js";
import {subjectApi} from "@/api/index.js";
import {v4 as uuid} from 'uuid'

function SubjectList(props) {
    const {run:subjectRun,isLoading:subjectLoading, data:subjectList,setData}=useAsync()
    const {run:newListRun}=useAsync()
    const {run:removeSubjectList}=useAsync()
    useEffect(()=>{
        subjectRun(subjectApi.getSubjects())
    },[])

    const [dataSource, setDataSource] = useState(subjectList?.list || []);
    useEffect(()=>{
        setDataSource(subjectList?.list || [])
        props.subjectsList(subjectList?.list || [])
    },[subjectList])
    // useEffect(()=>{
    //
    // },[dataSource])

    const params = useParams();
    const columns = [
        {
            key: "sort",
            width: 50,
        },
        {
            editable: true,
            dataIndex: "subjectName",
            render: (text, record) => (
                <NavLink to={`/subject/${record.subjectId}`}
                         className={({ isActive }) =>
                             {
                                 isActive && `text-blue-500`
                             }
                         }
                >
                    <p
                        // onClick={()=>()}
                        className={`flex-grow truncate py-2 ${
                            params.subjectId === record.subjectId
                                ? `text-blue-500 font-medium`
                                : `text-gray-500 `
                        }`}
                    >
                        {text}
                    </p>
                </NavLink>
            ),
        },
        {
            width: 50,
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

    const onDragEnd = (subjectList) => {
        console.log(subjectList, "拖拽排序结束");
    };
    const confirm = (subjectId) => {
        removeSubjectList(subjectApi.removeSubject(subjectId))
            .then(()=>{
                setData({
                    list:dataSource.filter((item)=>{
                        return item.subjectId!==subjectId
                    })
                })
                message.success('删除成功')
            })
            .catch(()=>{
                message.success('删除失败');
            })
    };


    const navTitle='科目'
    const isButton='true'
    const newList=(subjectName)=>{
        const newData={
            allowDelete: 0,
            orderId: uuid(),
            subjectId: "88",
            subjectName: subjectName,
            updateTime: "1681235483"
        }
        setDataSource([...dataSource,newData])
        newListRun(subjectApi.postSubject({subjectName:subjectName, orderId:1, last:1}))
        console.log('新建'+navTitle,subjectName)
        message.success('添加'+navTitle+'成功');
    }

    return (
        <div className={`flex flex-col h-full`}>
            <div className={`flex-shrink-0`}>
                <UiDargNav navTitle={navTitle} newList={newList} isButton={isButton}/>
            </div>
            <div className={`flex-grow h-full`}>
                <UiScrollContent>
                    <UiDargTable
                        data={dataSource}
                        columns={columns}
                        handleDragEnd={onDragEnd}
                        loading={subjectLoading}
                    />
                </UiScrollContent>
            </div>
        </div>
    );
}

export default observer(SubjectList);
