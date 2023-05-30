import React from 'react';

function QuestionListType({questionAnswer,questionOptions,type}) {
    return (
        <div className={`flex space-x-4`}>
            {
                Object.keys(questionOptions).map((key)=>(
                    <div key={key}
                         className={` flex
                         ${questionAnswer.indexOf(key)!==-1&&'text-green-400'}`}>
                        <p>{key}：</p>
                        <p>{questionOptions[key]}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default QuestionListType;