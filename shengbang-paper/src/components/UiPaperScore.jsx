import React, {useEffect, useState} from 'react';

function UiPaperScore({questionList}) {
    const [score,setScore]=useState(0)
    useEffect(()=>{
        let num=0;
        questionList.map((item)=>{
                num+= parseInt(item.score)
        })
        setScore(num)
    },[questionList])
    return (
        <div>{score}分</div>
    );
}

export default UiPaperScore;