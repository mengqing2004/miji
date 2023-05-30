import React from 'react';
import { Spin } from "antd";
import UseQuestionListData from "@/hooks/useQuestionListData.js";
export const ShowDetailFromType=({data})=>{
    return(
        <>
            <div>
                {/*1单选题 2多选题 3判断题*/}
                {
                    [1,2,3].indexOf(data.questionType)!==-1&&(
                        <div className={`mb-2`}>
                            {Object.keys(data.questionOptions||{}).map((key)=>(
                                    <span
                                        key={key}
                                        className={`p-2 ${
                                             data.questionAnswer.indexOf(key) !==-1?`text-green-500`:'text-red-300'
                                        }`}
                                    >
                                        {key}:{data["questionOptions"][key]}
                                    </span>
                                ))
                            }
                        </div>
                    )
                }


                {/*4填空题 5简答题*/}
                {
                    [4,5].indexOf(data.questionType)!==-1 &&(
                        <p className={`p-2 mb-2 text-green-500`}>
                            答案:{data["questionAnswer"][0]}
                        </p>
                    )
                }

                <div className={`p-2 border rounded text-gray-500 italic`}>
                    <p>解析：</p>
                    <p className={`pl-8 max-w-[900px] min-w-[200px]`}>{data["questionExplain"]}</p>
                </div>

            </div>
        </>
    )
}

function TableDetail({questionsId}) {
    const {questionList,loading}=UseQuestionListData(questionsId)
    return (
        <div className={`px-2 text-xs`}>
            {loading?(
                <Spin tip={'加载题目详情'}/>
            ):
                <ShowDetailFromType data={questionList}/>
            }
        </div>
    );
}

export default TableDetail;