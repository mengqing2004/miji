import React, {useEffect, useState,useRef} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {LeftOutlined} from '@ant-design/icons'
import {Button, Descriptions, Divider, Table} from "antd";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import PaperDetailTable from "@/components/content/paper/PaperDetailTable.jsx";
import PaperDetailNav from "@/components/content/paper/PaperDetailNav.jsx";
import UiPaperBack from "@/components/UiPaperBack.jsx";
import {useStore} from "@/store/index.js";
import {observer} from "mobx-react-lite";
import {ShowDetailFromType} from "@/components/content/question/TableDetail.jsx";
import UiPaperScore from "@/components/UiPaperScore.jsx";

const columns = [
    {
        title: <p className={`text-center`}>序号</p>,
        dataIndex: 'score',
        render: (score,record,index) => <p className={`text-center`}>{index+1}</p>
    },
    {
        title: '题干',
        dataIndex: 'questionName',
        render: (questionName,record) => (
            <>
                <p>{questionName}</p>
                <ShowDetailFromType data={record}/>
            </>
        )
    },
    {
        title: '分数',
        dataIndex: 'score',
        width:"5%"
    },
];

function PaperDetail() {
    const navigator=useNavigate();
    const {paperId}=useParams()
    const {paperStore}=useStore()
    const {paperDetail}=paperStore;
    useEffect(()=>{
        paperStore.getPaperDetail(paperId).then(()=>{
            console.log(paperDetail,'1111')
        })
    },[paperId])
    const handleClick=()=>{
        navigator(`/paper/edit?paperId=${paperId}`)
    }


    return (
        <>
            <UiPaperBack isLoading={paperStore.isLoading}>
                <div className={`px-2 flex flex-col h-full`}>
                    <div className={`flex flex-shrink-0 justify-between `}>
                        <div className={`flex items-center space-x-1`}>
                            <p>查看试卷详情</p>
                        </div>
                        <div className={`flex items-center space-x-2`}>
                            <Link to={`/paper/download?paperId=${paperId}`}>
                                <Button type='primary'>下载试卷</Button>
                            </Link>

                            {/*<Button type='primary' onClick={downloadClick}>下载试卷</Button>*/}
                            <Button type='primary' onClick={handleClick}>编辑试卷</Button>
                        </div>
                    </div>
                    <div className={`flex-grow h-full`}>
                        <UiScrollContent>
                            {/*<Divider>{paperDetail.paperName}</Divider>*/}
                            <Descriptions bordered>
                                <Descriptions.Item label="所属科目" span={3}>HTML</Descriptions.Item>
                                <Descriptions.Item label="试卷名称" span={3}>{paperDetail.paperName}</Descriptions.Item>
                                <Descriptions.Item label="创建人" span={1}>{paperDetail.nickName}</Descriptions.Item>
                                <Descriptions.Item label="更新时间" span={2}>{paperDetail.updateTime}</Descriptions.Item>
                                <Descriptions.Item label="总分数" span={1}><UiPaperScore questionList={paperDetail.questionList}/></Descriptions.Item>
                                <Descriptions.Item label="题目数量" span={2}>{paperDetail.questionNumber}<span className={`italic`}>
                                    （30道选择题；20道判断题；10道简答题）
                                </span></Descriptions.Item>
                            </Descriptions>
                            <Table
                                pagination={{
                                    position: ["none", "none"],
                                }}
                                rowKey={"questionId"}
                                columns={columns}
                                dataSource={paperDetail.questionList}
                            />
                            {/*<PaperDetailNav/>*/}
                            {/*<PaperDetailTable />*/}
                        </UiScrollContent>
                    </div>
                </div>
            </UiPaperBack>
        </>
    );
}

export default observer(PaperDetail);