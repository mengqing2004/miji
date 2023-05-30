import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useStore} from "@/store/index.js";
import {Col, Descriptions, Divider, Row, Spin} from "antd";
import UiLoading from "@/components/UiLoading.jsx";

function PaperDetailNav() {
    const {paperId}=useParams()
    const {paperStore}=useStore()
    const {paperDetail}=paperStore;
    useEffect(()=>{
        paperStore.getPaperDetail(paperId)
    },[paperId])
    return (
        <>
            <Divider>{paperDetail.paperName}</Divider>
            <Descriptions>
                <Descriptions.Item label="总分数">100分</Descriptions.Item>
                <Descriptions.Item label="创建人">{paperDetail.nickName}</Descriptions.Item>
                <Descriptions.Item label="更新时间">{paperDetail.updateTime}</Descriptions.Item>
                <Descriptions.Item label="题目数量">{paperDetail.questionNumber}<span className={`italic`}>
                  （30道选择题；20道判断题；10道简答题）
                </span></Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default PaperDetailNav;