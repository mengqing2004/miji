import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Table} from "antd";
import {DeleteOutlined, DownloadOutlined, FormOutlined} from "@ant-design/icons";
import {useStore} from "@/store/index.js";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

const columns = ({onDelete, onEdit, onDownload}) => [
    {
        title: <p className={`text-center`}>序号</p>,
        dataIndex: 'paperId',
        render:(paperId,record,index)=> <p className={`text-center`}>{index+1}</p>
    },
    {
        title: '试卷名称',
        dataIndex: 'paperName',
        render: (paperName,record) => <p className={`truncate max-w-[300px]`}><Link to={`/paper/${record.paperId}`}>{paperName}</Link></p>
    },
    {
        title: '所属科目',
        dataIndex: 'subjectName',
    },
    // {
    //     title: '题目数量',
    //     dataIndex: 'questionNumber',
    // },
    {
        title: '创建人',
        dataIndex: 'nickName',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
    },
    {
        title: '操作',
        dataIndex: '',
        render: (record) =>
            <div className={`flex space-x-2 flex items-center`}>
                {/*TODO 修改删除下载按钮*/}
                <a>
                    <DownloadOutlined onClick={() => onDownload(record)}/>
                </a>
                <a>
                    <FormOutlined onClick={() => onEdit(record)}/>
                </a>
                <a>
                    {record.allowDelete === 1 ?
                        <Popconfirm
                            title="删除警告"
                            description="你是否要删除此项?"
                            onConfirm={() => {
                                onDelete(record)
                            }}
                            okText="是"
                            cancelText="否"
                            style={null}
                        >
                            <DeleteOutlined/>
                        </Popconfirm>
                        : ''}
                </a>


            </div>
    },
];

function PaperTable() {
    const navigator=useNavigate();
    let [searchParams, ] = useSearchParams();
    const {paperStore} = useStore();
    const {paperList, isLoading} = paperStore;
    useEffect(()=>{
        paperStore.getPaperList({subjectId:searchParams.get('subjectId')})
    },[searchParams])


    const onDelete = (record) => {
        console.log('删除', record)
        paperStore.removePaperList(record.paperId)
    }

    const onEdit = (record) => {
        navigator(`edit?paperId=${record.paperId}`)
        console.log('修改', record.paperId)
    }

    const onDownload = (record) => {
        navigator(`download?paperId=${record.paperId}`)
        console.log("下载", record)
    }

    return (
        <div>
            <Table
                pagination={{
                    position: ["none", "none"],
                }}
                rowKey={"paperId"}
                columns={columns({onDelete, onEdit, onDownload})}
                dataSource={paperList}
                loading={isLoading}
            />
        </div>
    );
}

export default observer(PaperTable);