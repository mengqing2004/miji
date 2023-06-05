import React, { useEffect, useState } from "react";
import { useStore } from "@/store";
import {Button, Form, Input, Select, Radio, Spin, message, Checkbox} from "antd";
import { observer } from "mobx-react-lite";
import {QuestionDictionary} from '@/config'
import {useParams} from "react-router-dom";
const difficultKeys =Object.keys(QuestionDictionary.difficult);

const formLayout = {
    labelCol: {
        sm: {
            span: 3,
        },
    },
    wrapperCol: {
        sm: {
            span: 19,
        },
    },
};

// 判断

function FormSelectTypeDetermine() {
    const {chapterId}=useParams()
    const { questionStore } = useStore();
    const { currentQuestionId } = questionStore.drawerConfig
    const [formData, setFormData] = useState(null);
    const [, contextHolder] = message.useMessage();

    useEffect(()=>{
        if (currentQuestionId!==-1){
            // 如果不等于-1,则是修改程序
            questionStore.getQuestionDetail(currentQuestionId).then(()=>{
                const {questionDetail}=questionStore;

                setFormData({
                    ...questionDetail,
                    questionDifficuly:questionDetail.questionDifficuly+"",
                    questionAnswer:questionDetail.questionAnswer[0],
                })
            })
        }

    },[])

    const onFinish=(values)=>{
        const submitData={
            ...values,
            chapterId,
            questionType: 3,
            questionOptions: {
                A:"正确",
                B:"错误",
            },
            questionAnswer: [values.questionAnswer],
        }
        console.log(submitData)

        if (currentQuestionId !=-1){
            submitData.questionId=currentQuestionId;
            questionStore.putQuestion(submitData).then(()=>{
                message.success("修改成功");
            })
        } else {
            //     添加
            questionStore.addQuestion(submitData).then(()=>{
                message.success("添加成功")
            })
        }
    }
    return (
        <>
            {contextHolder}
            {questionStore.isLoading ? (
                <div className={`flex justify-center`}>
                    <Spin tip={`加载题目详情`} />
                </div>
            ) : (
                <Form
                    {...formLayout}
                    autoComplete="off"
                    validateTrigger={["onChange", "onSubmit"]}
                    onFinish={onFinish}
                    initialValues={formData}
                >
                    <Form.Item
                        name={`questionDifficulty`}
                        label={`题目难度`}
                        rules={[
                            {
                                required: true,
                                message: "请选择题目难度",
                            },
                        ]}
                    >
                        <Select placeholder={`请选择题目难度`}>
                            {difficultKeys.map((key) => {
                                return (
                                    <Select.Option key={key} value={key}>
                                        {QuestionDictionary.difficult[key]}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name={`questionName`}
                        label={`题干`}
                        rules={[
                            {
                                required: true,
                                message: "请填写题干",
                            },
                        ]}
                    >
                        <Input placeholder="请输入题干" />
                    </Form.Item>

                    <Form.Item
                        name={`questionAnswer`}
                        label={`正确答案`}
                        rules={[
                            {
                                required: true,
                                message: "请选择正确答案",
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="A">正确</Radio>
                            <Radio value="B">错误</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name={`questionExplain`}
                        label={`答案解析`}
                    >
                        <Input.TextArea allowClear showCount placeholder="请输入答案解析" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {currentQuestionId === -1 ? "添加题目" : "确认修改"}
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
}

export default observer(FormSelectTypeDetermine);