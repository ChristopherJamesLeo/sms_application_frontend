import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { login } from './Auth';
import "./style.css";
import api from '../api/api';

export default function Login({ setData }) {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const showMessage = (type, content) => {
        messageApi.open({ type, content });
    };

    const onFinish = async (values) => {
        try {
            let UserDeviceInfo = await api.get("https://api.ipregistry.co/?key=ira_5I8TlQf8yTHoiPnbPnOKmvwbllGS582LImul");
                    if(UserDeviceInfo){
                        console.log(UserDeviceInfo);
                            values.ip = UserDeviceInfo.data.ip,
                            values.country = UserDeviceInfo.data.location.country.name,
                            values.city = UserDeviceInfo.data.location.city,
                            values.timezone  = UserDeviceInfo.data.time_zone.id,
                            values.browser  = UserDeviceInfo.data.user_agent.name,
                            values.brand  = UserDeviceInfo.data.user_agent.device.brand,
                            values.type  = UserDeviceInfo.data.user_agent.device.type,
                            values.os = UserDeviceInfo.data.user_agent.os.name,
                            values.connection  = UserDeviceInfo.data.connection.organization
                    }
                    console.log(values);
            
            const response = await login(values);
            const data = response.data;
            if (data) {
                localStorage.setItem('userData', JSON.stringify(data.user));
                localStorage.setItem('api_token', data.token);
                localStorage.setItem('remember_token', data.remember_token);

                if (data.user && data.remember_token) {
                    setData(data.user);
                    
                    navigate("/");
                    showMessage('success', "Login successful");
                } else {
                    navigate('/login');
                }
            } else {
                showMessage('error', "Username or password is incorrect");
                return false;
                // console.log('Data processing failed');
            }
        } catch (err) {
            
            showMessage('error', "Username or password is incorrect");
            return false;
            // console.log("Login failed", err);
        }
    };

    return (
        <div className='w-100 h-screen flex justify-center items-center login_container'>
            <div className='w-2/6 flex justify-center items-center p-16 login_box_container'>
                <div className='border p-2 rounded-lg login_form_container'>
                    <h1 className='text-3xl text-center'>Log In</h1>
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ width: "500px", padding: "20px" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <div className='flex items-start justify-between'>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <div onClick={() => navigate('/register')} style={{ cursor: "pointer" }}>
                                Register
                            </div>
                        </div>
                        <Form.Item wrapperCol={{ offset: 20, span: 24 }}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                        {contextHolder}
                    </Form>
                </div>
            </div>
        </div>
    );
}
