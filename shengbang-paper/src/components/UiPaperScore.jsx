import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
function UiPaperScore({questionList}) {
    const [score,setScore]=useState(0)
    useEffect(()=>{
        let num=0;
        questionList && questionList.map((item)=>{
                num+= parseInt(item.score)
        })
        setScore(num)
    },[questionList])
    return (
        <>{score}分</>
    );
}

export default observer(UiPaperScore);