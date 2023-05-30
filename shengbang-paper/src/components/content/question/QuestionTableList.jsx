import React, {useEffect, useState} from 'react';
import {getQuestionList} from "@/api/question.Api.js";
import useAsync from "@/hooks/useAsync.js";
import {questionApi} from "@/api/index.js";
import {keys} from "mobx";
import UseQuestionListData from "@/hooks/useQuestionListData.js";
import QuestionExplain from "@/components/content/question/QuestionExplain.jsx";
import QuestionListType from "@/components/content/question/QuestionListType.jsx";

function QuestionTableList({questionsId}) {
    const {questionList,loading}=UseQuestionListData(questionsId)
    console.log(questionList,"questionList")



    return (
        <div>
            {questionList.questionType<4?
                <QuestionListType type={questionList.questionType} questionAnswer={questionList.questionAnswer} questionOptions={questionList.questionOptions}/>
                :<p className={`text-green-400`}>答案：  {questionList.questionAnswer}</p>
            }

            <QuestionExplain data={questionList.questionExplain}/>
        </div>
    );
}

export default QuestionTableList;