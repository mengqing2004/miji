import {Button, Form, Input, message, Modal, Radio} from 'antd';
import { useState } from 'react';
import useAsync from "@/hooks/useAsync.js";

const CollectionCreateForm = ({ open, onCreate, onCancel  }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="您正在创建一个新的数据"
            okText="确定"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="title"
                    label="请输入名称"
                    rules={[
                        {
                            required: true,
                            message: '请先填写该名称!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


            </Form>
        </Modal>
    );
};
const App = ( {navTitle,newList}) => {
    const [open, setOpen] = useState(false);
    const {run}=useAsync()

    const onCreate = (values) => {
        // if (navTitle==='科目'){
        //     run(subjectApi.postSubject({subjectName:values, orderId:1, last:1}))
        // }
        // else if(navTitle==='章节'){
        //     run(subjectApi.postChapters({subjectId:params,chapterName:values, orderId:1, last:1}))
        // }
        // else {
        //     console.log(navTitle,'添加失败','无有效api')
        // }
        // console.log('Received values of form: ', values);
        if ((values.title+'').trim()==""){
            console.log(values,'values+688888888')
            console.log((values),'112233')
            message.error("不能为空")
        }else {
            newList(values.title)
            setOpen(false);
        }

    };
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                新建{navTitle}
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default App;