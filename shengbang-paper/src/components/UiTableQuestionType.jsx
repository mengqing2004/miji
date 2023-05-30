import React from 'react';
import {Tag} from "antd";
import {questionTypeData,questionDifficultyData} from "@/components/content/question/questionType.js";

function UiTableQuestionType({difficulty,type}) {
  const color=['green','yellow','red']
    const difficultys= questionDifficultyData.map(
        item=>{
            if(item.value==difficulty){
                return item.label
            }
        })
    const types=questionTypeData.map(
        item=>{
            if (item.value==type){
                return item.label
            }
        }
    )
    return (
        <>
            {difficulty?
                <Tag color={color[difficulty-1]}>{difficultys}</Tag>
                :<Tag color="blue">{types}</Tag>}

        </>
    );
}

export default UiTableQuestionType;