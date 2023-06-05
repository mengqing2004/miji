import React, {useEffect, useRef} from 'react';
import {Button, Descriptions} from "antd";
import {useSearchParams} from "react-router-dom";
import {useStore} from "@/store/index.js";
import exportPDF from '@/utils/exportPDF.js'
import UiPaperBack from "@/components/UiPaperBack.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import UiPaperScore from "@/components/UiPaperScore.jsx";
import {observer} from "mobx-react-lite";

function DownloadPaper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const paperId = searchParams.get("paperId")
    const {paperStore} = useStore()
    const {paperDetail} = paperStore;
    useEffect(() => {
        paperStore.getPaperDetail(paperId).then(() => {
            console.log(paperDetail, '1111')
        })
    }, [paperId])
    const downloadref = useRef(null)
    const downloadClick = () => {
        exportPDF('测试下载', downloadref.current)
    }
    return (
        <div className={`h-screen`}>
            <UiPaperBack isLoading={paperStore.isLoading}>
                <div className={`flex flex-col h-full`}>
                    <div className={`text-right pr-8 flex-shrink-0`}>
                        <Button size={"small"} type='primary' onClick={downloadClick}>下载试卷</Button>
                    </div>
                    <UiScrollContent>
                        <div
                            // ref={downloadref}
                            className={`space-y-20 `}>
                            <div className={`px-14 pt-6 space-y-16 `}>

                                <p className={`text-3xl flex items-center space-x-4 justify-center`}>
                                    <p className={`font-bold`}>
                                        {paperDetail.paperName}
                                    </p>
                                    <span className={`text-lg text-gray-600 flex items-center`}>
                                        (满分<UiPaperScore questionList={paperDetail.questionList}/>)
                                    </span>
                                </p>

                                <Descriptions size={'default'} column={4}>
                                    <Descriptions.Item span={1} label={<p
                                        className={`text-xl text-gray-600`}>班级</p>}></Descriptions.Item>
                                    <Descriptions.Item span={1} label={<p
                                        className={`text-xl text-gray-600`}>姓名</p>}></Descriptions.Item>
                                    <Descriptions.Item span={1} label={<p
                                        className={`text-xl text-gray-600`}>分数</p>}></Descriptions.Item>
                                </Descriptions>
                            </div>
                            <ul className={`px-14 text-xl space-y-10 pb-10`}>
                                {paperDetail &&
                                    paperDetail.questionList &&
                                    paperDetail.questionList.map((item, index) => (
                                        <li key={index} className={`space-y-4`}>
                                            <p>{index + 1}、{item.questionName} </p>
                                            {/*1单选题 2多选题 3判断题*/}
                                            {
                                                [1, 2, 3].indexOf(item.questionType) !== -1 && (
                                                    <div className={` px-4 grid grid-cols-2`}>
                                                        {Object.keys(item.questionOptions || {}).map((key) => (
                                                            <p
                                                                key={key}
                                                                className={`p-2`}
                                                            >
                                                                {key}： {item["questionOptions"][key]}
                                                            </p>
                                                        ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            {/*4填空题 5简答题*/}
                                            {
                                                [5].indexOf(item.questionType) !== -1 && (
                                                    <p className={`h-16`}></p>
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

export default observer(DownloadPaper);