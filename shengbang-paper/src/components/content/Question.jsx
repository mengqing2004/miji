import React from 'react';
import QuestionChapter from "@/components/content/question/QuestionChapter.jsx";
import QuestionTable from "@/components/content/question/QuestionTable.jsx";
import UiDargNav from "@/components/UiDargNav.jsx";
import {Outlet, useParams} from "react-router-dom";
import SubjctHelp from "@/components/content/subject/SubjctHelp.jsx";
import QuestionHelp from "@/components/content/question/QuestionHelp.jsx";

function Question() {
    const navTitle='题目';
    const {chapterId}=useParams()
    return (
        <div className={`h-screen w-full`}>
            <div className={`h-full w-full flex divide-x `}>
                <div className={`w-1/4 h-full min-w-max`}>
                    <QuestionChapter/>
                </div>
                <div className={`w-3/4 h-full`}>

                        {chapterId?<Outlet/>:<QuestionHelp/>}

                </div>
            </div>
        </div>
    );
}

export default Question;