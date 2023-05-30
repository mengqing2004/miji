import React, {useState} from 'react';
import {Button, Checkbox, Col, Drawer, Form, Input, message, Modal, Radio, Row, Select} from 'antd';
import {questionDifficultyData, questionTypeData} from "@/components/content/question/questionType.js";
import {v4 as uuid} from "uuid";
import {useParams} from "react-router-dom";
import {useStore} from "@/store/index.js";
const {Option} = Select;
const CheckboxGroup = Checkbox.Group;
const QuestionFrom = ({questionNewData}) => {
    const {chapterId} = useParams()
    const questionOptions = ['A', 'B', 'C', 'D'];
    const [open, setOpen] = useState(false);
    const [selectType, setSelectType] = useState('1')
    const { questionStore } = useStore();
    const [, contextHolder] = message.useMessage();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onType = (value) => {
        setSelectType(value)
    }
    const onFinish = (values) => {
        let Options;
        values.questionType === '1' || values.questionType === '2' ?
            Options = {A: values.A, B: values.B, C: values.C, D: values.D} : Options = {}
        const newData = {
            questionId: uuid(),
            chapterId,
            questionName: values.questionName,
            questionType: values.questionType,
            questionDifficulty: values.questionDifficulty,
            questionExplain: values.questionExplain,
            userNickName: '米',
            updateTime: "1994-09-11 05:30:55",
            questionAnswer: values.questionType === '4' ? `空1、${values.A} 空2、${values.B}` : values.questionAnswer,
            questionOptions: Options
        }
        // questionNewData(newData)
        // onClose()
        questionStore.addQuestion(newData).then(() => {
            message.success("添加成功");
        });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        onClose()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {/*点击叉号显示的弹出框*/}
            <Modal
                title="你确定要取消更改吗?"
                okText='退出'
                cancelText='继续编辑'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <p>如果点击退出,该表单就会被重置</p>
            </Modal>
            <Button type="primary" onClick={showDrawer}>
                + 添加题目
            </Button>
            <Drawer
                title="创建题目"
                width={720}
                onClose={showModal}
                open={open}
                bodyStyle={{
                    paddingBottom: 10,
                }}
            >
                <Form onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={20}>
                            <Form.Item
                                name="questionName"
                                label="题目:"
                                rules={[{required: true, message: '请填写题目'}]}
                            >
                                <Input placeholder="请填写题目"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="questionDifficulty"
                                label="难度"
                                rules={[{required: true, message: '请选择难度'}]}
                            >
                                <Select
                                    placeholder='请选择难度'
                                >
                                    {
                                        questionDifficultyData.map((item) => (
                                            <Option key={item.value} value={item.value}>{item.label}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="questionType"
                                label="类型"
                                rules={[{required: true, message: '请选择类型'}]}
                            >
                                <Select
                                    placeholder='请选择类型'
                                    onChange={onType}
                                >
                                    {
                                        questionTypeData.map((item) => (
                                            <Option key={item.value} value={item.value}>{item.label}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        {selectType == 1 || selectType == 2 ?
                            //单选和多选表单
                            <>
                                <Col span={20}>
                                    <Form.Item
                                        name="A"
                                        label="A:"
                                        rules={[{required: true, message: '请填写答案A'},]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={20}>
                                    <Form.Item
                                        name="B"
                                        label="B:"
                                        rules={[{required: true, message: '请填写答案B'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={20}>
                                    <Form.Item
                                        name="C"
                                        label="C:"
                                        rules={[{required: true, message: '请填写答案C'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={20}>
                                    <Form.Item
                                        name="D"
                                        label="D:"
                                        rules={[{required: true, message: '请填写答案D'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                {/*单选按钮*/}
                                {selectType == 1 ?
                                    <Col span={20}>
                                        <Form.Item
                                            name="questionAnswer"
                                            label="正确答案:"
                                            rules={[{required: true, message: '请选择答案'}]}
                                        >
                                            <Radio.Group
                                                options={questionOptions}
                                            >
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col> : ''}
                                {/*多选按钮*/}
                                {selectType == 2 ?
                                    <Col span={20}>
                                        <Form.Item name="questionAnswer"
                                                   label="正确答案:"
                                                   rules={[{required: true, message: '请选择答案'}]}>
                                            <CheckboxGroup options={questionOptions}/>
                                        </Form.Item>
                                    </Col> : ''}
                            </>
                            : ''}
                        {/*判断*/}
                        {selectType == 3 ?
                            <>
                                <Col span={20}>
                                    <Form.Item>
                                        <label className={`mr-4`}>A:</label>
                                        <label className={`mr-4`}>正确</label>
                                    </Form.Item>
                                </Col>
                                <Col span={20}>
                                    <Form.Item>
                                        <label className={`mr-4`}>B:</label>
                                        <label className={`mr-4`}>错误</label>
                                    </Form.Item>
                                </Col>
                                <Col span={20}>
                                    <Form.Item name="questionAnswer"
                                               label="正确答案:"
                                               rules={[{required: true, message: '请选择答案'}]}>
                                        <Radio.Group>
                                            <Radio value={1}>A</Radio>
                                            <Radio value={2}>B</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </>
                            : ''}
                        {/*简答和填空*/}
                        {selectType == 4 ?
                            <>
                                <Col span={10}>
                                    <Form.Item
                                        name='A'
                                        label='空1'
                                        rules={[{required: true, message: '请填入该题答案',}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name='B'
                                        label='空2'
                                        rules={[{required: true, message: '请填入该题答案',}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </>
                            : ''}
                        {selectType == 5 ?
                            <Col span={24}>
                                <Form.Item
                                    name='questionAnswer'
                                    label="简答题"
                                    rules={[{required: true, message: '请填入该题答案',}]}
                                >
                                    <Input.TextArea rows={4} placeholder="请填入该题答案"/>
                                </Form.Item>
                            </Col>
                            : ''}
                    </Row>
                    <Row gutter={16} style={{paddingTop: 20,}}>
                        <Col span={24}>
                            <Form.Item
                                name="questionExplain"
                                label="题目解析"
                                rules={[
                                    {
                                        required: true,
                                        message: '请填入该题解析',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="请填入该题解析"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button htmlType="submit" type="primary" className={`w-20`}>
                        提交
                    </Button>
                </Form>
            </Drawer>
        </>
    );
};
export default QuestionFrom;