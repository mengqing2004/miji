import React, {useEffect, useState} from 'react';
import SubjectList from "./subject/SubjectList.jsx";
import SubjctHelp from "./subject/SubjctHelp.jsx";


import { Outlet, useParams } from "react-router-dom";
import UiDargNav from "@/components/UiDargNav.jsx";
import {subjectApi} from "@/api/index.js";
import {message} from "antd";
import useAsync from "@/hooks/useAsync.js";
import UiScrollContent from "@/components/UiScrollContent.jsx";
function Subject() {
    const params = useParams();
    useEffect(()=>{
        if (subjectList!==[]||subjectList!==null||subjectList!==undefined){
            subjectList.map((item)=>{
                if (item.subjectId===params.subjectId){
                    setSubjectName(item.subjectName)
                }
            })
        }
    },[params.subjectId])


    const [subjectName,setSubjectName]=useState(null)
    const [subjectList,setSubjectList]=useState([])

    const subjectsList=(subjectsList)=>{
        setSubjectList(subjectsList)
        if (subjectsList!==[]||subjectsList!==null){
            subjectsList.map((item)=>{
                if (item.subjectId===params.subjectId){
                    setSubjectName(item.subjectName)
                    console.log(item.subjectName)
                }
            })
        }
    }


    const navTitle='章节';
    return (
        <>
            <div className={`h-screen w-full min-w-max`}>
                <div className={`h-full w-full flex divide-x`}>
                    <div className={`w-1/4 h-full`}>
                        <SubjectList subjectsList={subjectsList}/>
                    </div>
                    <div className={`w-3/4 `}>
                        <div className={'flex flex-col h-full'}>
                            <div className={`h-full flex flex-col`}>
                                {/*{chapter}*/}
                                <div className={`flex-shrink-0`}>
                                    {params.subjectId ? <UiDargNav navTitle={navTitle} title={subjectName}/> : ''}
                                </div>
                                <div className={`h-full flex flex-grow border-t`}>
                                    {params.subjectId ? <Outlet /> : <SubjctHelp />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Subject;