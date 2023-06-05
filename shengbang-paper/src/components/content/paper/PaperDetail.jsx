import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Descriptions} from "antd";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import UiPaperBack from "@/components/UiPaperBack.jsx";
import {useStore} from "@/store/index.js";
import {observer} from "mobx-react-lite";
import UiPaperScore from "@/components/UiPaperScore.jsx";
import exportPDF from '@/utils/exportPDF.js'
import UiPaperContent from "@/components/content/paper/UiPaperContent.jsx";

const chineseNum = ["一", "二", "三", "四", "五"];

function PaperDetail() {
    const navigator = useNavigate();
    const {paperId} = useParams()
    const {paperStore} = useStore()
    const {paperDetail, paperPrintData} = paperStore;
    useEffect(() => {
        paperStore.getPaperPrintData(paperId)
    }, [paperId])
    const handleClick = () => {
        navigator(`/paper/edit?paperId=${paperId}`)
    }

    const downloadref = useRef(null)
    const downloadClick = () => {
        exportPDF('测试下载', downloadref.current)
    }

    const [showAnswer,setShowAnswer]=useState(false)
    const printPage=()=>{
        let newstr = document.getElementById("printContent").innerHTML;
        console.log(newstr)
        document.body.innerHTML = newstr;
        window.print();
        window.location.reload()
    }
    return (
        <>
            <UiPaperBack isLoading={paperStore.isLoading}>
                <div className={`px-2 flex flex-col h-full`}>
                    <div className={`flex flex-shrink-0 justify-between `}>
                        <div className={`flex items-center space-x-1`}>
                            <p>查看试卷详情</p>
                        </div>
                        <div className={`flex items-center space-x-2`} >

                            <Button type='primary' onClick={printPage}>下载试卷</Button>

                            {/*<Button type='primary' onClick={downloadClick}>下载试卷</Button>*/}
                            <Button type='primary' onClick={handleClick}>编辑试卷</Button>
                            <Button type={showAnswer?'':'primary'} onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer?'隐藏':'显示'}答案</Button>
                        </div>
                    </div>
                    <div className={`flex-grow h-full`}>
                        <UiScrollContent>
                            <div id="printContent">
                                <div ref={downloadref} >
                                    <div className={`space-y-20`}>
                                        <div className={`px-32 pt-6`}>
                                            <p className={`text-3xl flex items-center space-x-4 justify-center font-bold`}>
                                                <span>{paperPrintData.paperName}</span>
                                                <span className={`text-lg text-gray-600 flex items-center font-medium pt-2`}>(满分<UiPaperScore questionList={paperDetail.questionList}/>)</span>
                                            </p>
                                            <div className={`ml-20 mt-12`}>
                                                <Descriptions size={'default'} column={4}>
                                                    <Descriptions.Item span={1} label={<p
                                                        className={`text-xl text-gray-600`}>班级</p>}></Descriptions.Item>
                                                    <Descriptions.Item span={1} label={<p
                                                        className={`text-xl text-gray-600`}>姓名</p>}></Descriptions.Item>
                                                    <Descriptions.Item span={1} label={<p
                                                        className={`text-xl text-gray-600`}>分数</p>}></Descriptions.Item>
                                                </Descriptions>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-14 py-2`}>
                                        {
                                            Object.keys(paperPrintData.questionList || {}).map((item, index) => {
                                                const question = paperPrintData.questionList[item];
                                                let textScore = 0
                                                question.map(s => {
                                                    textScore += s.score;
                                                })
                                                return (
                                                    <div key={index} className={`pb-6 pt-4`}>
                                                        {question.length > 0 &&
                                                            <>
                                                                <h1 className={`text-xl font-bold pb-6 pt-4`}>
                                                                    {chineseNum[index]}、{item}({question.length}道题,共{textScore}分)
                                                                </h1>
                                                                {question.map((q,i)=>(
                                                                    <div key={i}>
                                                                        <UiPaperContent
                                                                            questionList={q}
                                                                            indexItem={i}
                                                                            showAnswer={showAnswer}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            </div>
                        </UiScrollContent>
                    </div>
                </div>
            </UiPaperBack>
        </>
    );
}

export default observer(PaperDetail);