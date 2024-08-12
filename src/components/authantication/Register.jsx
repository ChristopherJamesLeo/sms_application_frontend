
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Button, Form, Input , message} from 'antd';
import "./style.css";


import { register } from './Auth';


export default function Register({setData}){

    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const navigate = useNavigate();
    
    const onFinish = (values) => {
            
        localStorage.setItem('userData', JSON.stringify(values));
        logInFormSubmit(values);
    };

    const onFinishFailed = (errorInfo) => {
        return false;
        // console.log('Failed:', errorInfo);

    };

    

    function logInFormSubmit(values){
        try {
            register(values).then((response)=>{
                return response.data
            }).then((data)=>{
                if(data){
                    if (!data.user.name && !data.user.name && !data.user.password  ) {
                        navigate('/login');
                    } else {
                        setData(data.user);
                        localStorage.setItem('userData',JSON.stringify(data.user));
                        localStorage.setItem('api_token',data.token);
                        localStorage.setItem('remember_token',data.remember_token);
                        navigate("/");
                        success("Register Successful");
                    }
                }else {
                    error("Please check you internet connection");
                }
                
            });
            
        } catch (error) {
            error("Please check your internet connection...");
            // console.log(error);
        }
        
    }


    return (
        <>
            <div className='w-100 h-screen  flex justify-center items-center login_container'>
                 <div className='w-2/6 flex justify-center items-center p-16 login_box_container'>
                    <div className='border p-2 rounded-lg login_form_container'>
                        {contextHolder}
                        <h1 className='text-3xl text-center'>Register</h1>
                        <Form
                            name="basic"
                            labelCol={{
                            span: 24,
                            }}
                            wrapperCol={{
                            span: 24,
                            }}
                            style={{
                                width : "500px",
                                height : "",
                                padding: "20px"
                            }}
                            initialValues={{
                            remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                            label="Username"
                            name="name"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                                <Input id='username' />
                            </Form.Item>
                            <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                                <Input id='email' />
                            </Form.Item>

                            <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <div className='flex items-start justify-between'>
                                <div>
                                    <div onClick={()=>{
                                        navigate('/login')
                                    }}><span style={
                                        {
                                            cursor: "pointer"
                                        }
                                    }>Log In</span></div>
                                    
                                </div>
                            </div>

                            <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span:24,

                                
                            }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                 </div>
            </div>
        </>
    )
}