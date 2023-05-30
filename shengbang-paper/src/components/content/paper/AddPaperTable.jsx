import { observer } from "mobx-react-lite";

import {DeleteOutlined, MenuOutlined} from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {Input, Popconfirm, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import UiTableQuestionType from "@/components/UiTableQuestionType.jsx";
import UiDragTable from "@/components/UiDargTable.jsx";
import UiTable from "@/components/UiTable.jsx";
import {useStore} from "@/store/index.js";
import question from "@/components/content/Question.jsx";


const AddPaperTable = () => {
    const {paperStore}=useStore()
    const {newPaperData,setNewPaperData}=paperStore

    // useEffect(()=>{
    //     setDataSource(newPaperData.questionList)
    // },[newPaperData])


    // const [dataSource, setDataSource] = useState([
    //     {
    //         questionId: "1",
    //         questionName: "stringstringstringstringstringstringstringstringstring",
    //         questionType: 1,
    //         questionDifficulty: 1,
    //         userNickName: "string",
    //         updateTime: "string",
    //         score:0
    //     },
    //     {
    //         questionId: "2",
    //         questionName: "stringstringstringstringstringstringstringstringstring",
    //         questionType: 2,
    //         questionDifficulty: 2,
    //         userNickName: "string",
    //         updateTime: "string",
    //         score:10
    //     }
    // ]);


    const columns = [
        {
            key: 'sort',

        },
        {
            title: <p className={`text-center`}>序号</p>,
            dataIndex: 'questionId',
            render: (questionId,record,index) => <p className={`text-center`}>{index+1}</p>
        },
        {
            title: "分数",
            dataIndex: 'score',
            editable: true,
            // render: (record) => <p className={`text-center`}>{record}</p>
        },
        {
            title: '题干',
            dataIndex: 'questionName',
            render:(record)=> <p className={`max-w-[500px] truncate`}>{record}</p>
        },
        {
            title: '难度',
            dataIndex: 'questionDifficulty',
            render:(record)=> <UiTableQuestionType difficulty={record}/>
        },
        {
            title: '题型',
            dataIndex: 'questionType',
            render:(record)=> <UiTableQuestionType type={record}/>
        },
        {
            title: '操作',
            dataIndex: 'questionId',
            render:(questionId,record)=>
                <>
                    <Popconfirm
                        title="删除警告"
                        description="你是否要删除此项?"
                        onConfirm={() => {
                            onDelete(record,questionId)
                        }}
                        okText="是"
                        cancelText="否"
                        style={null}
                    >
                        <DeleteOutlined/>
                    </Popconfirm>
                </>

        },
    ];
    //删除
    const onDelete = (record,questionId) => {
        console.log(questionId,'删除', record)
        const oldQuestionList=newPaperData.questionList;

        paperStore.setNewPaperData({
            ...newPaperData,
            questionList:oldQuestionList.filter((question)=>{
                return question.questionId!==questionId
            })
        })
    }
    // const onDragEnd = ({ active, over }) => {
    //     if (active.id !== over?.id) {
    //         setDataSource((previous) => {
    //             const activeIndex = previous.findIndex((i) => i.questionId === active.id);
    //             const overIndex = previous.findIndex((i) => i.questionId === over?.id);
    //             return arrayMove(previous, activeIndex, overIndex);
    //         });
    //     }
    // };
    //修改分数
    // const handleSave = (row) => {
    //     const newData = [...dataSource];
    //     const index = newData.findIndex((item) => row.questionId === item.questionId);
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //         ...item,
    //         ...row,
    //     });
    //     setNewPaperData({
    //         ...newPaperData,
    //         questionList:newData
    //     });
    // };
    return (
        <>
            <UiTable  columns={columns}/>
        </>
    );
};
export default observer(AddPaperTable);