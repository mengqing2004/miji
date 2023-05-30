import React from 'react';

function QuestionExplain({data}) {
    return (
        <div className={`m-4 border p-4 text-gray-500 space-y-1`}>
            <p>解析:</p>
            <p className={`pl-4 text-[12px] min-w-[100px] max-w-[800px]`}>{data}</p>
        </div>
    );
}

export default QuestionExplain;