

import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, message, Popconfirm} from "antd";
import {useParams} from "react-router-dom";
import {useStore} from "@/store/index.js";
import UiDargTable from "@/components/UiDargTable.jsx";
import {DeleteOutlined} from "@ant-design/icons";
import UiDargNav from "@/components/UiDargNav.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import useAsync from "@/hooks/useAsync.js";
import {subjectApi} from "@/api/index.js";
import CreateNewList from "@/components/content/subject/CreateNewList.jsx";



function ChapterList(props) {
    const {run:chapterRun,isLoading:chapterLoading, data:chapterList,setData}=useAsync()
    const {run:removeChapterList}=useAsync()
    const params = useParams();
    const subjectId=params.subjectId || 0

    const [dataSource, setDataSource] = useState(chapterList?.list || []);
    useEffect(()=>{
            chapterRun(subjectApi.getChapters(subjectId))
    },[subjectId])
    useEffect(()=>{
        setDataSource(chapterList?.list || [])
    },[chapterList])

    //表头
    const columns = [
        {
            key: "sort",
            width: 50,
        },
        {
            editable: true,
            dataIndex: "chapterName",
            render: (text, record, index) => (
                <p className={`flex-grow py-2`}>
                    <span className={`text-gray-500`}>{`第${index + 1}章、`}</span>
                    {text}
                </p>
            ),
        },
        {
            width: 50,
            render: (text, record) =>
                record.allowDelete === 1 &&(
                    <p id={record.subjectId} className={`flex items-center justify-center text-gray-500`}>
                        <Popconfirm
                            title="是否删除?"
                            description="你真的要删除它吗?"
                            onConfirm={()=>confirm(record.chapterId)}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type="link" >
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </p>

                ),
        },
    ];
    //移动
    const onDragEnd = (chapterList) => {
        console.log(chapterList, 877);
    };
    //删除


    const confirm = (chapterId) => {
        //删除按钮
        removeChapterList(subjectApi.removeChapters(chapterId))
            .then(()=>{
                setData({
                    list:dataSource.filter((item)=>{
                        return item.chapterId !==chapterId;
                    })
                })
                message.success('删除成功');

            })
            .catch(()=>{
                message.success('删除失败');
            })
    };
    //新建
    const {run:newListRun}=useAsync()
    const navTitle='章节';
    const newList=(chapterName)=>{
        const newData={
            allowDelete: 1,
            orderId: 36,
            chapterId: "88",
            chapterName: chapterName,
            updateTime: "1681235483"
        }
        setDataSource([...dataSource,newData])
        newListRun(subjectApi.postChapters({subjectId:params,chapterName:chapterName, orderId:1, last:1}))
        console.log('新建'+navTitle,chapterName,'11111')
        message.success('添加'+navTitle+'成功');
    }


    return (
            <div className={`flex flex-col w-full -mt-8  space-y-5 h-full`}>
                <div className={`text-right pr-4  -mt-5  flex-shrink-0`}>
                    <CreateNewList navTitle={navTitle} newList={newList} params={params}  />
                </div>
                <div className={`flex-grow h-full`}>
                    <UiScrollContent>
                        <UiDargTable
                            loading={chapterLoading}
                            data={dataSource}
                            columns={columns}
                            handleDragEnd={onDragEnd}
                        />
                    </UiScrollContent>
                </div>
            </div>
    );
}

export default ChapterList;