
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import QuestionTable from "@/components/content/question/QuestionTable.jsx";
import UiDargNav from "@/components/UiDargNav.jsx";
import { useSearchParams } from "react-router-dom";
import QuestionSelect from "@/components/content/question/QuestionSelect.jsx";
import useChapterData from "@/hooks/useChapterData.js";
import QuestionDrawer from "@/components/content/question/QuestionDrawer.jsx";
import { useStore } from "@/store/index.js";
import { observer } from "mobx-react-lite";
import {Button} from "antd";
function QuestionContent() {
    const {chapterId}=useParams()

    //title
    let [searchParams, setSearchParams] = useSearchParams();
    const subjectid=searchParams.get('subjectId')
    const {chapter}=useChapterData(subjectid)
    const [title,setTitle]=useState(null)
    useEffect(()=>{
        setTitle(chapter?.map(item=>{
            if (item.chapterId==Number(chapterId)){
                return item.chapterName
            }
        }))

    },[chapter,chapterId])

   //抽屉
    const { questionStore } = useStore();
    const handleAdd = () => {
        questionStore.setDrawerConfig({
            ...questionStore.drawerConfig,
            open: true,
            title: "添加题目",
        });
    };
    return (
        <div className={`flex h-full flex-col`} >
            <div className={`flex-shrink-0`}>
                <div className={`flex justify-between items-center pr-4`}>
                    <UiDargNav navTitle={'题目'} title={title}  />
                    <Button type='primary' onClick={handleAdd}>添加题目</Button>
                    <QuestionDrawer/>
                    {/*<QuestionFrom questionNewData={questionNewData}/>*/}
                </div>
                <QuestionSelect />
            </div>
            <div className={`flex-grow h-full`}>
                {/*<div className={`h-full`}>*/}
                {/*</div>*/}
                <UiScrollContent>
                    <QuestionTable/>
                </UiScrollContent>
            </div>

        </div>

    );
}

export default observer(QuestionContent);