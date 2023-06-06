import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from "antd";
import { useStore } from "@/store/index.js";
import { observer } from "mobx-react-lite";
import { QuestionDictionary } from "@/config/index.js";
// type
// typeOptions
// difficult
// difficultOptions
import {useSearchParams} from "react-router-dom";
import UiDargNav from "@/components/UiDargNav.jsx";

function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const {subjectStore,chapterStore,questionStore}=useStore()
    const [subjectId, setSubjectId] = useState(undefined);

    useEffect(()=>{
        subjectStore.getSubjectsList()
        setSubjectId(searchParams.get("subjectId"))
    },[])

    const [defaultChapterId,setChapterId]=useState(undefined)
    useEffect(()=>{
        if (subjectId!==null&&subjectId!==undefined){
            chapterStore.getChapterList(subjectId)
                // .then(()=>{
                // const defaultChapterId=chapterStore.chapterList[0].chapterId
                // searchParams.set("chapterId",defaultChapterId)
                // setSearchParams(searchParams)
                // setChapterId(defaultChapterId)
            // })
        }
            // handleChange({name:"chapterId",undefined});


    },[subjectId])

    const handleChange=(param)=>{
        if (param.value){
            searchParams.set(param.name,param.value);
        }else {
            searchParams.delete(param.name)
        }
        setSearchParams(searchParams)
    }
    // const subjectHandleChange=()=>{
    //     searchParams.delete("questionDifficulty")
    //     searchParams.delete("questionType")
    //     setSearchParams(searchParams)
    // }
    return (
        <div>
            <UiDargNav navTitle={'题目'}/>
            <Row  gutter={[8, 8]}>
                <Col span={12} >
                    <Select
                        className={`w-full`}
                        allowClear={true}
                        disabled={subjectStore.isLoading||chapterStore.isLoading||questionStore.isLoading}
                        loading={subjectStore.isLoading}
                        placeholder={`选择科目`}
                        value={
                            searchParams.get("subjectId")?
                                searchParams.get("subjectId"):
                                undefined
                        }
                        options={
                            subjectStore.subjectsList.map((subject)=>{
                                return{
                                    value:subject.subjectId,
                                    label:subject.subjectName,
                                }
                            })
                        }
                        onChange={(value)=>{
                            setSubjectId(value);
                            setChapterId(undefined)
                            handleChange({name:"subjectId",value});
                            handleChange({name:"chapterId",undefined});
                            // subjectHandleChange();
                            handleChange({name:"questionDifficulty",undefined});
                            handleChange({name:"questionType",undefined});
                        }}
                    />
                </Col>
                <Col span={12}>
                    <Select
                        className={`w-full`}
                        allowClear={true}
                        // disabled={false}
                        loading={chapterStore.isLoading}
                        placeholder={`选择章节`}
                        disabled={searchParams.get("subjectId")==null||subjectStore.isLoading||chapterStore.isLoading||questionStore.isLoading}
                        // defaultValue={defaultChapterId}
                        value={
                            searchParams.get("chapterId")?
                            (searchParams.get("chapterId")):
                            undefined
                        }
                        options={
                            chapterStore.chapterList.map((chapter)=>{
                                return{
                                    value:chapter.chapterId,
                                    label:chapter.chapterName,
                                }
                            })
                        }
                        onChange={(value)=>{
                            setChapterId(value)
                            handleChange({name:"chapterId",value});
                        }}
                    />
                </Col>
                <Col span={12} >
                    <Select
                        className={`w-full`}
                        allowClear={true}
                        disabled={searchParams.get("subjectId")==null||subjectStore.isLoading||chapterStore.isLoading||questionStore.isLoading}
                        loading={subjectStore.isLoading||chapterStore.isLoading||questionStore.isLoading}
                        placeholder={`选择难度`}
                        value={
                            searchParams.get("questionDifficulty")?
                                parseInt(searchParams.get("questionDifficulty"))
                                : null
                        }
                        options={QuestionDictionary.difficultOptions}
                        onChange={(value)=>{
                            handleChange({name:"questionDifficulty",value});
                        }}
                    />
                </Col>
                <Col span={12}>
                    <Select
                        className={`w-full`}
                        allowClear={true}
                        disabled={searchParams.get("subjectId")==null||subjectStore.isLoading||chapterStore.isLoading||questionStore.isLoading}
                        loading={subjectStore.isLoading||chapterStore.isLoading||questionStore.isLoading}
                        placeholder={`选择类型`}
                        value={
                            searchParams.get("questionType")?
                                parseInt(searchParams.get("questionType"))
                                : null
                        }
                        options={QuestionDictionary.typeOptions}
                        onChange={(value)=>{
                            handleChange({name:"questionType",value});
                        }}
                    />
                </Col>
            </Row>

        </div>
    );
}

export default observer(SearchBar);