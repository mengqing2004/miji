import React, {useEffect, useState} from 'react';
import SubjectList from "./subject/SubjectList.jsx";
import SubjctHelp from "./subject/SubjctHelp.jsx";


import {Outlet, useParams} from "react-router-dom";
import UiDargNav from "@/components/UiDargNav.jsx";
import {useStore} from "@/store/index.js";

function Subject() {
    const {subjectId} = useParams();
    // const [subjectName, setSubjectName] = useState(undefined)
    // console.log(subjectId)

    // const {subjectStore} = useStore()
    // useEffect(() => {
    //     subjectStore.subjectsList.map(item => {
    //         if (parseInt(item.subjectId) === parseInt(subjectId)) {
    //             setSubjectName(item.subjectName)
    //         }
    //     })
    // }, [subjectId])

    // const{run,data}=useAsync()
    // useEffect(()=>{
    //     run(subjectApi.getSubjects()).then(()=>{
    //         // console.log(data)
    //         data.list.map(item=>{
    //             if (parseInt(item.subjectId)===parseInt(subjectId)){
    //                 setSubjectName(item.subjectName)
    //             }
    //         })
    //     })
    // },[subjectId])

    // const navTitle = '章节';
    return (
        <>
            <div className={`h-screen w-full `}>
                <div className={`h-full w-full flex divide-x`}>
                    <div className={`w-80 min-w-[100px] h-full flex-shrink-0`}>
                        <SubjectList/>
                    </div>
                    <div className={`min-w-[900px] h-full flex-grow` }>
                        <div className={'flex flex-col h-full'}>
                            <div className={`h-full flex flex-col`}>
                                {/*{chapter}*/}
                                {/*<div className={`flex-shrink-0`}>*/}
                                {/*    {subjectId ? <UiDargNav navTitle={navTitle} title={subjectName}/> : ''}*/}
                                {/*</div>*/}
                                <div className={`h-full flex flex-grow border-t`}>
                                    {subjectId ? <Outlet/> : <SubjctHelp/>}
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