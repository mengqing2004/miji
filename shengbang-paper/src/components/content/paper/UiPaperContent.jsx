import React, {useEffect, useState} from 'react';

function UiPaperContent({questionList, indexItem,showAnswer}) {
    const questionText = `${indexItem + 1}、${questionList.questionName}`
    const [showQuestionAnswer,setShowAnswer]=useState(showAnswer)
    useEffect(()=>{
        setShowAnswer(showAnswer)
    },[showAnswer])

    return (
        <div className={`pb-4 pt-2`}>

            {
                [1, 2].indexOf(questionList.questionType) !== -1 && (
                    <>
                        <h1 className={`text-lg pl-2 py-1`}>{questionText}</h1>
                        <div className={`py-2 grid grid-cols-2 px-10 gap-1`}>
                            {Object.keys(questionList.questionOptions).map(option => {
                                return (
                                        <p key={option} className={`p-2`}>
                                            {option}、{questionList.questionOptions[option]}
                                        </p>
                                )
                            })}
                        </div>
                    </>
                )
            }
            {
                [3].indexOf(questionList.questionType) !== -1 && (
                    <>
                        <h1 className={`text-lg pl-2 py-1`}>{questionText}
                        <span className={`py-1`}>
                            &nbsp;&nbsp;(
                            {showQuestionAnswer ?
                                <>
                                    {[3].indexOf(questionList.questionType) !== -1 && (
                                        <><span className={`text-green-500`}>&nbsp;&nbsp;{questionList.questionAnswer}&nbsp;&nbsp;</span></>)}
                                </>
                                :<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                            }
                            )
                        </span>
                        </h1>
                    </>
                )
            }
            {
                [4].indexOf(questionList.questionType) !== -1 && (
                    <>
                        <h1 className={`text-lg pl-2 py-1`}>{questionText}</h1>
                    </>
                )
            }
            {
                [5].indexOf(questionList.questionType) !== -1 && (
                    <>
                        <h1 className={`text-lg pl-2 py-1`}>{questionText}</h1>
                    </>
                )
            }

            <div className={showQuestionAnswer?`px-6 py-2`:''}>
                {showQuestionAnswer?<p>
                    {
                        [1,2,4].indexOf(questionList.questionType) !== -1 && (
                            <>
                                <span className={`italic`}>答案</span>: <span className={`text-green-500`}>{questionList.questionAnswer}</span>
                            </>
                        )
                    }
                </p>:''
                }



                    <p className={`py-2`}>
                        {
                            [5].indexOf(questionList.questionType) !== -1 && (
                                <>
                                    {showQuestionAnswer?
                                        <>
                                            <span className={`italic`}>答案</span>: <span className={`text-green-500`}>{questionList.questionAnswer}</span>
                                        </>
                                        :<>
                                            <p className={'h-48'}></p>
                                        </>}
                                </>
                            )
                        }
                    </p>



                {showQuestionAnswer?<p className={`italic py-2`}>
                    <span>解析</span>: {questionList.questionExplain}
                </p>:''}

            </div>


        </div>
    );
}

export default UiPaperContent;