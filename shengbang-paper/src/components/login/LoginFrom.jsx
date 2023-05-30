import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, message,} from "antd";
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import {useStore} from "@/store/index.js";
import { useNavigate } from "react-router-dom";

function LoginFrom() {
    const [messageApi, contextHolder] = message.useMessage()
    const [form]=Form.useForm()
    const { userStore } = useStore();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

        const onFinish = async ({username,password,remember}) => {

            setLoading(true);
            try {
                await userStore.login({ username, password });
                navigate("/", { replace: true });
            }
            catch (errMsg) {
                console.log('Success:',username,password,remember);
                messageApi.error({ key: "login", content: errMsg });
                setLoading(false);
            }
        };



    // const onFinishFailed = () => {
    //     messageApi.open({
    //         type: 'error',
    //         content: '登录失败 用户名或账号密码不正确',
    //     })
    // };
    return (
        <div>
            {/*TODO 测试换将使用，真实环境删除*/}
            <button
                className={`fixed top-0 left-0 border p-2`}
                onClick={() =>
                    onFinish({ username: "13312341234", password: "123456" })
                }
            >
                一键登录
            </button>
            {contextHolder}
            <Form
                form={form}
                validateTrigger={['onChange']}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                className="login-form"
                initialValues={{ remember: true }}
            >
            <Form.Item
                name="username"
                rules={[
                    { required: true, message: "请输入用户名" },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: "用户名格式不正确",
                        // validateTrigger: "onBlur onChange",

                        // validateTrigger: "onBlur onChange",
                    },
                ]}

            >
                <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: "请输入密码" },
                    {
                        len: 6,
                        message: "密码格式不正确",
                        // validateTrigger: "onBlur",
                    },
                ]}>
                <Input.Password  size="large" placeholder="请输入密码"  prefix={<LockOutlined />}/>
            </Form.Item>
            <Form.Item>
                <div className={`flex justify-between`}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/*<a className="login-form-forgot  " href="#">*/}
                    {/*    忘记密码*/}
                    {/*</a>*/}
                </div>
            </Form.Item>
            <Form.Item className="submit" shouldUpdate>
                {()=>(
                    <Button
                        loading={loading}
                        disabled={
                            !form.isFieldTouched("username") ||
                            !form.isFieldTouched("password") ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length)
                                .length
                        }
                        type="primary"
                        htmlType="submit"
                        className={`w-full`}>
                        登录
                    </Button>
                )}
            </Form.Item>
        </Form>
        </div>
    );
}

export default LoginFrom;