import React from 'react';
import {List} from "antd";
import useChapterData from "@/hooks/useChapterData.js";
import {Link, useParams} from "react-router-dom";

function QuestionChapterNav({subjectId,subjectName}) {
    const {chapter,isLoading}=useChapterData(subjectId,subjectName)
    let {chapterId}= useParams()
    return (
        <div className={`min-w-max`}>
            <List
                loading={isLoading}
                size="small"
                dataSource={chapter}
                renderItem={(item,index) =>
                    <List.Item>
                        <div className={`flex px-6 justify-between items-center w-full`}>
                            <Link
                                to={{
                                    pathname: `${item.chapterId}`,
                                    search: window.location.search,
                                }}
                                // to={`${item.chapterId}?subjectId=${subjectId}&subjectName=${subjectName}`}
                            >
                                <div className={`flex hover:text-gray-500 text-black`}>
                                    <p>第{index+1}章、</p>
                                    <p className={chapterId==item.chapterId? 'text-blue-500':'text-black'}>{item.chapterName}</p>
                                </div>
                            </Link>
                            <p className={`px-3 ml-2  bg-gray-100 rounded-full`}>{item.questionNum}</p>
                        </div>
                    </List.Item>}
            />
        </div>
    );
}

export default QuestionChapterNav;