import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Table} from "antd";
import QuestionTableList from "@/components/content/question/QuestionTableList.jsx";
import useQuestionData from "@/hooks/useQuestionData.js";
import {useParams, useSearchParams} from "react-router-dom";
import UiTableQuestionType from "@/components/UiTableQuestionType.jsx";
import {DeleteOutlined,FormOutlined} from "@ant-design/icons";
import {useStore} from "@/store/index.js";
import {observer} from "mobx-react-lite";
import TableDetail from "@/components/content/question/TableDetail.jsx";
import question from "@/components/content/Question.jsx";
import {questionTypeData} from "@/components/content/question/questionType.js";
const columns=({onDelete,onEdit}) => [
    {
        title: '题干',
        dataIndex: 'questionName',
        render:(record)=><p className={`truncate w-32`}>{record}</p>
    },
    {
        title: '难度',
        dataIndex: 'questionDifficulty',
        render:(record)=> <UiTableQuestionType difficulty={record}/>
    },
    {
        title: '类型',
        dataIndex: 'questionType',
        render:(record)=> <UiTableQuestionType type={record}/>
    },
    {
        title: '修改者',
        dataIndex: 'nickName',
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
    },
    {
        title: '操作',
        dataIndex: '',
        render: (questionId,record) =>
            <div className={`flex space-x-4 flex items-center`}>
                <a>
                    {/*TODO 修改按钮*/}
                    <FormOutlined onClick={()=>onEdit(questionId,record.questionType)}/>
                </a>
                <a>
                    <Popconfirm
                        title="删除警告"
                        description="你是否要删除此项?"
                        onConfirm={()=> {
                            onDelete(record.questionId)
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </a>
            </div>
    },
];

function QuestionTable() {
    let [searchParams, setSearchParams] = useSearchParams();
    const questionType=searchParams.get('questionType')
    const questionDifficulty=searchParams.get('questionDifficulty')

    const {chapterId}=useParams()
    const subjectId=searchParams.get('subjectId')
    const {questionStore}=useStore();
    const {questionList,isLoading}=questionStore;

    useEffect(()=>{
        if (questionType||questionDifficulty){
                questionStore.siftQuestion({subjectId,chapterId, questionType, questionDifficulty})
        }else {
            questionStore.getQuestionList({subjectId,chapterId})
        }
    },[chapterId,questionType,questionDifficulty])

    const onDelete=(questionId)=>{
        console.log(questionId)
        questionStore.deleteQuestion(questionId)
    }

    const onEdit=(question,questionType)=>{
        console.log(question,'111222333')
        questionStore.setDrawerConfig({
            currentQuestionId: question.questionId,
            currentQuestionType: questionType,
            open:true,
            title:"编辑题目",
        })
    }


    // const [questionData,setQuestionData]=useState(null)
    //
    // useEffect(()=>{
    //     questionStore.siftQuestion(chapterId,questionType,questionDifficulty)
    // },[questionType,questionDifficulty])
    // useEffect(()=>{
    //     questionType&&questionDifficulty ?
    //         setQuestionData(questionList.filter(item=>(
    //             item.questionType==questionType&&item.questionDifficulty==questionDifficulty
    //         )))
    //         : questionDifficulty?
    //             setQuestionData(questionList.filter(item=>(
    //                 item.questionDifficulty==questionDifficulty
    //             )))
    //             :questionType?
    //                 setQuestionData(questionList.filter(item=>(
    //                     item.questionType==questionType
    //                 )))
    //                 :setQuestionData(null)
    // },[questionType,questionDifficulty])

    return (
        <div>
            <Table
                // tableLayout='fixed'
                // scroll={{
                //     y:620
                // }}
                pagination={false}
                rowKey={"questionId"}
                columns={columns({onDelete,onEdit})}
                expandable={{
                    expandedRowRender: (record) => (
                        <>
                            {/*<QuestionTableList questionsId={record.questionId}/>*/}
                            <TableDetail questionId={record.questionId}/>
                        </>
                   ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={questionList}
                loading={isLoading}
            />
        </div>
    );
}

export default observer(QuestionTable);