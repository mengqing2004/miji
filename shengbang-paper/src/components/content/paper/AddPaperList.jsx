import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Input, message, Select} from "antd";
import UiPaperScore from "@/components/UiPaperScore.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import useSubjectData from "@/hooks/useSubjectData.js";
import UiDargNav from "@/components/UiDargNav.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import AddPaperTable from "@/components/content/paper/AddPaperTable.jsx";
import {observer} from "mobx-react-lite";
import {useStore} from "@/store/index.js";
import UiPaperDetermine from "@/components/UiPaperDetermine.jsx";
import RanDom from "@/components/content/paper/RanDom.jsx";

function AddPaperList() {
    const navigator = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const {subject} = useSubjectData()
    const [searchParams, setSearchParams] = useSearchParams();
    const {paperStore} = useStore()
    const {newPaperData} = paperStore
    useEffect(() => {
        const paperId = searchParams.get("paperId")
        if (paperId !== null) {
            paperStore.getEditPaperData(paperId)
        }
        return () => {
            paperStore.initNewPaperData()
        }
    }, [])
    //subjectid/papername/questionList 不能为空
    const _checkNewPaperData = () => {
        const duration = 1.5;
        if (newPaperData.subjectId.length === 0) {
            message.error("请选择试卷所属科目", duration)
            return false;
        }
        if (newPaperData.paperName.length === 0 ||newPaperData.paperName===''||newPaperData.paperName==null||(newPaperData.paperName+'').trim()=="") {
            message.error("试卷名称不能为空", duration)
            return false;
        }
        if (newPaperData.questionList.length === 0) {
            message.error("题目列表不能为空", duration)
            return false;
        }


        return true;
    }

    const savePaper = () => {
        const paperId = searchParams.get("paperId")
        if (_checkNewPaperData()) {
            let promise = null;
            if (paperId == null) {
                promise = paperStore.addPaper()
            } else {
                promise = paperStore.putPaper()
            }

            promise.then(() => {
                message.success("发布成功", 1.5, () => {
                    navigator("/paper", {replace: true})
                })
            })
        }
    }
    ///////////
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
        searchParams.delete("chapterId")
        searchParams.delete("subjectId")
        setSearchParams(searchParams)
    };
    const handleOk = () => {
        const randomsubjectId = searchParams.get("randomsubjectId")
        const randomquestionType = searchParams.get("randomquestionType")
        const randomquestionDifficulty = searchParams.get("randomquestionDifficulty")
        const scoreInput = searchParams.get("scoreInput")
        const questionInput = searchParams.get("questionInput")

        console.log(randomsubjectId, randomquestionType, randomquestionDifficulty, scoreInput, questionInput)


        if (randomsubjectId == null || randomquestionType == null || randomquestionDifficulty == null || scoreInput == null || questionInput == null || parseInt(scoreInput) == NaN || parseInt(questionInput) == NaN) {
            message.error("请填写正确的信息")
        } else {
            const params={
                sbujectId:randomsubjectId,
                questionType:randomquestionType,
                questionDifficulty:randomquestionDifficulty,
                count:questionInput,
                score:scoreInput
            }
            setConfirmLoading(true);
            // params
            paperStore.getRanDomPaperList(params).then(()=>{
                setOpen(false);
                setConfirmLoading(false);
                clearId()
            })
            // setTimeout(() => {
            // }, 2000);
        }

    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        clearId()
    };
    const clearId = () => {
        searchParams.delete("randomsubjectId")
        searchParams.delete("randomquestionType")
        searchParams.delete("randomquestionDifficulty")
        searchParams.delete("scoreInput")
        searchParams.delete("questionInput")
        setSearchParams(searchParams)
    }
    ////////////
    return (
        <>

            <RanDom handleCancel={handleCancel} handleOk={handleOk} open={open} confirmLoading={confirmLoading}
                    subject={subject}/>

            {/*{contextHolder}*/}
            <div className={`w-full h-full px-1 flex flex-col`}>
                <div className={`flex justify-between items-center pr-4 space-x-4`}>
                    <UiDargNav navTitle={searchParams.get("paperId") ? `编辑试卷` : `添加试卷`}/>
                    {/*<Link to={'/paper/random'}>*/}
                    {/*TODO 随机试题*/}
                    {/*<Button type="primary" onClick={showModal}>*/}
                    {/*    获取随机试题*/}
                    {/*</Button>*/}
                    {/*</Link>*/}
                    <Button type="primary" onClick={savePaper}>
                        发布试卷
                        {/*{currentQuestionId === -1 ? "添加题目" : "确认修改"}*/}
                    </Button>
                </div>
                <Descriptions bordered>
                    <Descriptions.Item label="所属科目" span={3}>
                        <Select
                            // defaultValue={
                            //     searchParams.get('paperSubjectId')
                            //         ? searchParams.get('paperSubjectId')
                            //         : undefined
                            // }
                            value={newPaperData.subjectId ? newPaperData.subjectId : undefined}
                            allowClear={true}
                            className={`w-full`}
                            placeholder={'请选择'}
                            onChange={(value) => {
                                paperStore.setNewPaperData({
                                    ...paperStore.newPaperData,
                                    subjectId: value,
                                })
                            }}
                            options={subject}
                            fieldNames={
                                {
                                    value: 'subjectId',
                                    label: 'subjectName'
                                }
                            }
                            loading={paperStore.isLoading}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="试卷名称" span={3}>
                        <Input
                            status={paperStore.newPaperData.paperName.length&&(paperStore.newPaperData.paperName+'').trim()!=="" ? "" : "error"}
                            placeholder={`请输入试卷名称`}
                            value={paperStore.newPaperData.paperName}
                            onChange={(e) => {
                                paperStore.setNewPaperData({
                                    ...paperStore.newPaperData,
                                    paperName: e.target.value,
                                })
                            }
                            }
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="试卷总分" span={1}>
                        <UiPaperScore questionList={paperStore.newPaperData.questionList}/>
                        {/*100分*/}
                    </Descriptions.Item>
                    <Descriptions.Item label="题目数量" span={2}>
                        <div className={`flex`}>
                            <span>共{paperStore.newPaperData.questionList.length}道</span>
                            <span className={`italic`}>
                                <UiPaperDetermine questionList={paperStore.newPaperData.questionList}/>
                                {/*（30道选择题；20道判断题；10道简答题）*/}
                            </span>
                        </div>
                    </Descriptions.Item>
                </Descriptions>

                <UiScrollContent>
                    {/*<div className={`h-[1000px] bg-gray-100`}></div>*/}
                    {/*<Table/>*/}
                    <AddPaperTable/>
                    {/*<CeshiTable/>*/}
                </UiScrollContent>

            </div>

        </>
    );
}

export default observer(AddPaperList);