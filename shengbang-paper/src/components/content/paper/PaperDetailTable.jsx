



import React, {useEffect} from 'react';
import { Table} from "antd";
import {useStore} from "@/store/index.js";
import {observer} from "mobx-react-lite";
import { useParams} from "react-router-dom";
import  {ShowDetailFromType} from "@/components/content/question/TableDetail.jsx";

const columns = [
    {
        title: '序号',
        dataIndex: 'score',
        render: (score,record,index) => <p className={`w-10`}>{index+1}</p>
    },
    {
        title: '题目',
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

function PaperDetailTable() {
    const {paperId}=useParams()
    const {paperStore}=useStore()
    const {paperDetail}=paperStore;
    useEffect(()=>{
        paperStore.getPaperDetail(paperId)
    },[paperId])
    return (
        <div>
            <Table
                pagination={{
                    position: ["none", "none"],
                }}
                rowKey={"questionId"}
                columns={columns}
                dataSource={paperDetail.questoinList}
                // dataSource={data}
                // loading={isLoading}
            />
        </div>
    );
}

export default observer(PaperDetailTable);