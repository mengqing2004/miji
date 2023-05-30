
import React, {useState} from 'react';
import UiDargNav from "@/components/UiDargNav.jsx";
import {Button, Select} from "antd";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import useSubjectData from "@/hooks/useSubjectData.js";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import PaperTable from "@/components/content/paper/PaperTable.jsx";


function PaperList() {
    let [searchParams, setSearchParams] = useSearchParams();
    const {subject,isLoading}=useSubjectData()
    // const subjectname=searchParams.get('subjectName')
    const navigate = useNavigate();
    const handleChange = (value,item) => {
        navigate("/paper/");
        if (value){
            searchParams.set('subjectId',value)
            // searchParams.set('subjectName',item.subjectName)
        }
        else {
            searchParams.delete('subjectId',value)
            // searchParams.delete('subjectName',item.subjectName)
        }
        setSearchParams(searchParams)
    };
    return (
        <>
            <div className={`mb-4 flex-shrink-0`}>
                <div className={`flex justify-between items-center pr-4`}>
                    <UiDargNav navTitle='试卷' />
                    <Link to={'add'}>
                        <Button type={'primary'}>添加试卷</Button>
                    </Link>
                </div>
                <div className={`px-4`}>
                    <Select
                        defaultValue={
                            searchParams.get('subjectId')
                                ? searchParams.get('subjectId')
                                : undefined
                        }
                        allowClear={true}
                        className={`w-[200px]`}
                        placeholder={'请选择'}
                        disabled={isLoading}
                        loading={isLoading}
                        onChange={handleChange}
                        options={subject}
                        fieldNames={
                            {
                                value:'subjectId',
                                label:'subjectName'
                            }
                        }
                    />
                </div>
            </div>
            <div className={`flex-grow h-full`}>
                <UiScrollContent>
                    <PaperTable/>
                </UiScrollContent>
            </div>
        </>
    );
}

export default PaperList;