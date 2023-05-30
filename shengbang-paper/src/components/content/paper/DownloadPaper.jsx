import React, {useEffect, useRef} from 'react';
import {Button, Descriptions, Divider} from "antd";
import {useSearchParams} from "react-router-dom";
import {useStore} from "@/store/index.js";
import exportPDF from '@/utils/exportPDF.js'
import UiPaperBack from "@/components/UiPaperBack.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
function DownloadPaper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const paperId=searchParams.get("paperId")
    const {paperStore}=useStore()
    const {paperDetail}=paperStore;
    useEffect(()=>{
        paperStore.getPaperDetail(paperId).then(()=>{
            console.log(paperDetail,'1111')
        })
    },[paperId])
    const downloadref=useRef(null)
    const downloadClick=()=>{
        exportPDF('测试下载',downloadref.current)
    }
    return (
        <div className={`h-screen`}>
            <UiPaperBack isLoading={paperStore.isLoading}>
                <div className={`flex flex-col h-full`}>
                    <div className={`text-right pr-8 flex-shrink-0`}>
                        <Button size={"small"} type='primary' onClick={downloadClick}>下载试卷</Button>
                    </div>
                    <UiScrollContent>
                        <div ref={downloadref} className={`space-y-20 `}>
                            <div className={`px-14 pt-6 `}>
                                <Divider>{paperDetail.paperName}</Divider>
                                <Descriptions>
                                    <Descriptions.Item label="姓名" ></Descriptions.Item>
                                    <Descriptions.Item label="班级"></Descriptions.Item>
                                    <Descriptions.Item label="分数"></Descriptions.Item>
                                </Descriptions>
                            </div>
                            <ul className={`px-14 text-lg space-y-20 pb-10`}>
                                {paperDetail.questionList.map((item,index)=>(
                                    <li key={index} className={`space-y-10`}>
                                        <p>{index+1}、{item.questionName}</p>
                                        {/*1单选题 2多选题 3判断题*/}
                                        {
                                            [1,2,3].indexOf(item.questionType)!==-1&&(
                                                <div className={`mb-2`}>
                                                    {Object.keys(item.questionOptions||{}).map((key)=>(
                                                        <span
                                                            key={key}
                                                            className={`p-2`}
                                                        >
                                        {key}:{item["questionOptions"][key]}
                                    </span>
                                                    ))
                                                    }
                                                </div>
                                            )
                                        }


                                        {/*4填空题 5简答题*/}
                                        {
                                            [5].indexOf(item.questionType)!==-1 &&(
                                                <p className={`h-12`}></p>
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </UiScrollContent>
                </div>
            </UiPaperBack>
        </div>
    );
}

export default DownloadPaper;