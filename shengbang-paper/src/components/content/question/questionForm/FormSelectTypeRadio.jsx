import React, {useEffect, useState} from "react";
import {useStore} from "@/store";
import {Button, Form, Input, message, Radio, Select, Spin} from "antd";
import {observer} from "mobx-react-lite";
import {QuestionDictionary} from '@/config'
import {useParams} from "react-router-dom";

const difficultKeys = Object.keys(QuestionDictionary.difficult);

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

// 单选表单
function FormSelectTypeRadio() {
    const {chapterId} = useParams()
    const {questionStore} = useStore();
    const {currentQuestionId} = questionStore.drawerConfig
    const [formData, setFormData] = useState(null);
    const [, contextHolder] = message.useMessage();
    useEffect(() => {
        if (currentQuestionId !== -1) {
            // 如果不等于-1,则是修改程序
            questionStore.getQuestionDetail(currentQuestionId).then(() => {
                const {questionDetail} = questionStore;

                setFormData({
                    ...questionDetail,
                    questionDifficulty: questionDetail.questionDifficulty + "",
                    optionA: questionDetail.questionOptions.A,
                    optionB: questionDetail.questionOptions.B,
                    optionC: questionDetail.questionOptions.C,
                    optionD: questionDetail.questionOptions.D,
                    questionAnswer: questionDetail.questionAnswer[0],
                })
            })
        }

    }, [])

    const onFinish = (values) => {
        if (values.optionA.trim() && values.optionB.trim() && values.optionC.trim() && values.optionD.trim() && values.optionA.trim() && values.questionName.trim()) {

            // console.log(values,'values',chapterId)
            const submitData = {
                // ...values,
                chapterId,
                questionType: 1,
                questionOptions: {
                    A: values.optionA,
                    B: values.optionB,
                    C: values.optionC,
                    D: values.optionD,
                },
                questionAnswer: [values.questionAnswer],
                questionDifficulty: parseInt(values.questionDifficulty),
                questionExplain: values.questionExplain ? values.questionExplain : null,
                questionName: values.questionName,
            }
            console.log(submitData)

            if (currentQuestionId != -1) {
                submitData.questionId = currentQuestionId;
                // submitData.questionId=currentQuestionId.questionId;
                // console.log(currentQuestionId,submitData.questionId)
                questionStore.putQuestion(submitData).then(() => {
                    message.success("修改成功");
                })
            } else {
                //     添加
                questionStore.addQuestion(submitData).then(() => {
                    message.success("添加成功")
                })

            }
        } else {
            message.error("题目或答案不能为空")
        }
    }
    return (
        <>
            {contextHolder}
            {questionStore.isLoading ? (
                <div className={`flex justify-center`}>
                    <Spin tip={'加载题目详情'}/>
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
                        <Input placeholder="请输入题干"/>
                    </Form.Item>

                    <Form.Item
                        name={`optionA`}
                        label={`选项A`}
                        rules={[
                            {
                                required: true,
                                message: "请填写A选项",
                            },
                        ]}
                    >
                        <Input placeholder="请输入选项A"/>
                    </Form.Item>

                    <Form.Item
                        name={`optionB`}
                        label={`选项B`}
                        rules={[
                            {
                                required: true,
                                message: "请填写B选项",
                            },
                        ]}
                    >
                        <Input placeholder="请输入选项B"/>
                    </Form.Item>

                    <Form.Item
                        name={`optionC`}
                        label={`选项C`}
                        rules={[
                            {
                                required: true,
                                message: "请填写C选项",
                            },
                        ]}
                    >
                        <Input placeholder="请输入选项C"/>
                    </Form.Item>

                    <Form.Item
                        name={`optionD`}
                        label={`选项D`}
                        rules={[
                            {
                                required: true,
                                message: "请填写D选项",
                            },
                        ]}
                    >
                        <Input placeholder="请输入选项D"/>
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
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                            <Radio value="D">D</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name={`questionExplain`}
                        label={`答案解析`}
                    >
                        <Input.TextArea allowClear showCount placeholder="请输入答案解析"/>
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

export default observer(FormSelectTypeRadio);