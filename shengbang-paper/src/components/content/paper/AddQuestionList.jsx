import React, {useEffect} from 'react';
import {Button, List, message, Typography} from 'antd';
import {useSearchParams} from "react-router-dom";
import {useStore} from "@/store/index.js";
import {QuestionDictionary} from "@/config"
import { observer } from "mobx-react-lite";
import question from "@/components/content/Question.jsx";
// type
// typeOptions
// difficult
// difficultOptions
function AddQuestionList(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const {questionStore,paperStore}=useStore()
    useEffect(()=>{
            // subjectId=82&chapterId=82&questionDifficult=1&questionType=1
            const apiParams={
                subjectId:searchParams.get("subjectId")||undefined,
                chapterId:searchParams.get("chapterId")||undefined,
                questionType:searchParams.get("questionType")||undefined,
                questionDifficulty:searchParams.get("questionDifficulty")||undefined,
            }
            if (apiParams.subjectId!=null){
                questionStore.getQuestionListForPage(apiParams)
            }
            return ()=> {
                questionStore.clearQuestionList()
            }

    },[searchParams])

    const {newPaperData,setNewPaperData}=paperStore;
    const _isInPaper=(questionId)=>{
        const questionList=newPaperData.questionList;
        for (let i in questionList){
            if (questionList[i].questionId===questionId){
                return true;
            }
           // return  questionList[i]===questionId ?  true: '';
        }
        return false;
    }
    const addNewQuestion=(newQuestion)=>{
        const oldQuestionList=newPaperData.questionList;
        setNewPaperData({
            ...newPaperData,
            questionList:[...oldQuestionList,newQuestion],
        })
    }

    const handleAddClick=(newQuestion)=>{
        if (_isInPaper(newQuestion.questionId)){
            message.error("添加失败,试卷中已存在本题",1.2)
        }else {
            addNewQuestion(newQuestion)
        }
    }
    // const addPaper=({questionName,questionType,questionId,questionDifficulty})=>{
    //     const newData={
    //
    //     }
    //     // setNewPaperData(
    //     //     ...newPaperData,
    //     // )
    // }
    return (
        <>
            <List
                locale={{emptyText:"当前筛选条件,未匹配到任何题目"}}
                loading={questionStore.isLoading}
                rowKey={"questionId"}
                dataSource={questionStore.questionList}
                renderItem={({questionName,questionType,questionId,questionDifficulty}) => (
                    <List.Item className={`hover:bg-gray-100`}>
                        <div className={`w-full space-y-4`}>
                            <Typography.Text mark>[
                                {QuestionDictionary.type[questionType]} &nbsp;-&nbsp;
                                {QuestionDictionary.difficult[questionDifficulty]}
                                ]</Typography.Text>
                            <div className={``}>
                                <div>
                                    {questionName}
                                </div>
                                <div className={`text-right`}>
                                    <Button type={'link'}>
                                        <span onClick={()=>handleAddClick({questionName,questionType,questionId,questionDifficulty,score:5,})}>加入试卷</span>
                                    </Button>
                                    {/*<span>已添加</span>*/}
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </>
    );
}

export default observer(AddQuestionList);