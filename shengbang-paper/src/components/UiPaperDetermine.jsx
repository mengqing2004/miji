import React, {useEffect, useState} from 'react';
import {QuestionDictionary} from '@/config'
function UiPaperDetermine({questionList}) {
    const [questionStr,setQuestionStr]=useState('')
    const questionType=QuestionDictionary.type

    useEffect(()=>{
        const res={}
        questionList.map((question)=>{
            //forEach(): 针对每一个元素执行提供的函数
            //map(): 创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来
                Object.keys(questionType).forEach((type)=>{
                    const key=questionType[type]
                    if (parseInt(type)===parseInt(question.questionType)){
                        if (key in res){
                            res[key]++
                        }else {
                            res[key]=1
                        }
                    }

                })
        })

        let str=''
        Object.keys(res).map((item)=>{
            str+=item+"("+res[item]+"道)"
        })
        setQuestionStr(str)

    },[questionList])

    return (
        <div>
            {/*（30道选择题；20道判断题；10道简答题）*/}
            {/*（30道选择题；20道判断题；10道简答题）*/}
            {questionList.length>0 ?questionStr:''}
        </div>
    );
}

export default UiPaperDetermine;