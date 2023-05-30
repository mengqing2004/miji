import React, {useEffect, useState} from 'react';
import {Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {QuestionDictionary} from "@/config/index.js";
import {observer} from "mobx-react-lite";
import UseQuestionRanDom from '@/hooks/useQuestionRanDom.js'
import {useStore} from "@/store/index.js";
import {useSearchParams} from "react-router-dom";
function RanDom({handleCancel,
                    handleOk,
                    open,
                    confirmLoading,
                    subject
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const {questionStore}=useStore()
    const [questionLength,setQuestionLength]=useState(0)
    useEffect(()=>{
        // subjectId=82&chapterId=82&questionDifficult=1&questionType=1
        const apiParams={
            subjectId:searchParams.get("randomsubjectId")||undefined,
            questionType:searchParams.get("randomquestionType")||undefined,
            questionDifficulty:searchParams.get("randomquestionDifficulty")||undefined,
        }
        if (apiParams.subjectId!=null){
            questionStore.getQuestionListRanDom(apiParams).then(()=>{
                setQuestionLength(questionStore.questionRanDomList.length)
                console.log(questionStore.questionRanDomList.length,1111111111)
            })
        }
        return ()=> {
            questionStore.clearQuestionRanDomList()
        }

    },[searchParams])
    const handleChange=(param)=>{
        if (param.value){
            searchParams.set(param.name,param.value);
        }else {
            searchParams.delete(param.name)
        }
        setSearchParams(searchParams)
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const checkQuestion = (_, value) => {
        if (parseInt(value.number)>questionLength){
            return Promise.reject(new Error('题目数量不能大于题目总数!'));
        }

        if (value.number > 0) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('题目数量必须大于0!'));
        }


    };
    const checkScore = (_, value) => {
        // if (parseInt(value.number)>questionStore.questionList.length){
        //     return Promise.reject(new Error('题目数量不能大于试卷总数!'));
        // }
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('分数必须大于0!'));
    };
    return (
        <Modal
            title="添加随机试题"
            open={open}
            onOk={handleOk}
            cancelText={`取消`}
            okText={`添加试题`}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <div className={` flex items-center`}>
                <div className={` mx-auto p-4 `}>
                    <div className={`flex space-x-4 justify-between `}>
                        <Select
                            className={`w-32`}
                            allowClear={true}
                            // disabled={subjectStore.isLoading || questionStore.isLoading}
                            // loading={loading}
                            value={
                                searchParams.get("randomsubjectId")
                                    ? searchParams.get("randomsubjectId")
                                    : undefined
                            }
                            placeholder={`选择科目`}
                            options={subject.map((item)=>{
                                return{
                                    value:item.subjectId,
                                    label:item.subjectName,
                                }
                            })}
                            onChange={(value)=>{
                                handleChange({name:"randomsubjectId",value});
                            }}

                        />
                        <Select
                            className={`w-32`}
                            allowClear={true}
                            // disabled={subjectStore.isLoading  || questionStore.isLoading}
                            // loading={loading}
                            placeholder={`选择难度`}
                            options={QuestionDictionary.difficultOptions}
                            value={
                                searchParams.get("randomquestionDifficulty")?
                                    parseInt(searchParams.get("randomquestionDifficulty"))
                                    : null
                            }
                            onChange={(value)=>{
                                handleChange({name:"randomquestionDifficulty",value});
                            }}
                        />
                        <Select
                            className={`w-32`}
                            allowClear={true}
                            // disabled={subjectStore.isLoading || chapterStore.isLoading || questionStore.isLoading}
                            // loading={loading}
                            placeholder={`选择类型`}
                            value={
                                searchParams.get("randomquestionType")?
                                    parseInt(searchParams.get("randomquestionType"))
                                    : null
                            }
                            options={QuestionDictionary.typeOptions}
                            onChange={(value)=>{
                                handleChange({name:"randomquestionType",value});
                            }}
                        />
                    </div>
                    <div>
                        <p className={`py-4 text-center text-gray-400 text-sm`}>上述条件,共筛选出
                            {/*{questionStore.questionList.length}*/}
                            {/*{questionList?.length||0}*/}
                            {questionLength}
                            {/*{questionStore.questionRanDomList.length}*/}
                            道题</p>
                    </div>

                    <Form
                        initialValues={{
                            questionNumber: {
                                number: 0,
                            },
                            score: {
                                number: 0,
                            },
                        }}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="questionNumber"
                                    label="题目数量"
                                    rules={[
                                        {
                                            validator: checkQuestion,
                                        },
                                    ]}
                                >
                                    <QuestionInput/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="score"
                                    label="每题分值"
                                    rules={[
                                        {
                                            validator: checkScore,
                                        },
                                    ]}
                                >
                                    <ScoreInput/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

        </Modal>
    );
}

const QuestionInput = ({value = {}, onChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [number, setNumber] = useState(0);
    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            ...value,
            ...changedValue,
        });
    };
    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('number' in value)) {
            setNumber(newNumber);
        }
        triggerChange({
            number: newNumber,
        });

        if (parseInt(e.target.value)!==0){
            searchParams.set('questionInput',parseInt(e.target.value));
        }else {
            searchParams.delete('questionInput')
        }
        setSearchParams(searchParams)

    };
    return (
        <span>
      <Input
          type="text"
          value={value.number || number}
          onChange={onNumberChange}
          style={{
              width: 100,
          }}

      />
    </span>
    );
};
const ScoreInput = ({value = {}, onChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [number, setNumber] = useState(0);
    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            ...value,
            ...changedValue,
        });
    };
    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('number' in value)) {
            setNumber(newNumber);
        }
        triggerChange({
            number: newNumber,
        });
        if (parseInt(e.target.value)!==0){
            searchParams.set('scoreInput',parseInt(e.target.value));
        }else {
            searchParams.delete('scoreInput')
        }
        setSearchParams(searchParams)
    };
    return (
        <span>
      <Input
          type="text"
          value={value.number || number}
          onChange={onNumberChange}
          style={{
              width: 100,
          }}
      />
    </span>
    );
};
export default observer(RanDom);