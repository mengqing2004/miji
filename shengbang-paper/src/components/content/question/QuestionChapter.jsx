import React, { useState} from 'react';
import { Select} from "antd";

import UiDargNav from "@/components/UiDargNav.jsx";
import useSubjectData from "@/hooks/useSubjectData.js";
import QuestionChapterNav from "@/components/content/question/QuestionChapterNav.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import {Navigate, useNavigate, useParams, useSearchParams} from "react-router-dom";


function QuestionChapter(props) {
    let [searchParams, setSearchParams] = useSearchParams();
    const {subject,isLoading}=useSubjectData()
    const subjectid=searchParams.get('subjectId')
    const subjectname=searchParams.get('subjectName')
    const navigate = useNavigate();


    const [subjectId,setSubjectId]=useState(subjectid==null? -1:subjectid)
    const [subjectName,setSubjectName]=useState(subjectname==null? null:subjectname)

    const handleChange = (value,item) => {
        navigate("/question/");
        console.log(`selected ${value}`);
        setSubjectId(value)
        setSubjectName(item.subjectName)
    };



    return (
        <div className={`flex flex-col h-full`}>
            <div className={`mb-4 flex-shrink-0`}>
                <UiDargNav navTitle={'章节'}/>
                <div className={`px-8`}
                    // className={`-mt-14 pt-1 pl-24 pr-2 mb-1`}
                >
                    <Select
                        className={`w-full`}
                        placeholder={subjectname?subjectname:'请选择'}
                        disabled={isLoading}
                        loading={isLoading}
                        onChange={handleChange}
                        options={subject}
                        fieldNames={
                            {
                                value:'subjectId',
                                label:'subjectName'
                            }
                        }/>
                </div>
            </div>
            <div className={`flex-grow h-full`}>
                <UiScrollContent>
                    <div>
                        <QuestionChapterNav subjectId={subjectId} subjectName={subjectName}/>
                    </div>
                </UiScrollContent>
            </div>
        </div>
    );
}

export default QuestionChapter;