
import React, { useEffect, useState } from 'react';
import {Routes , Route, Link , useNavigate} from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import axios, { Axios } from 'axios';
import MainLayout from '../layout/MainContainer';

import "./style.css";


export default function Login({setData}){


    const navigate = useNavigate();
    
    const onFinish = (values) => {
    
        localStorage.setItem('userData', JSON.stringify(values));

        logInFormSubmit(values)
        setData(values);

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };

    function logInFormSubmit(values){
        console.log(values.username,values.password);
        setData(values);
        if (!values.username && !values.password) {
            navigate('/login');
          } else {
            navigate("/");
          }
    }

      

      

    
    return (
        <>
            <div className='w-100 h-screen  flex justify-center items-center login_container'>
                 <div className='w-2/6 flex justify-center items-center p-16 login_box_container'>
                    <div className='border p-2 rounded-lg login_form_container'>
                        <h1 className='text-3xl text-center'>Log In</h1>
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
                            name="username"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                                <Input />
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
                                <Form.Item
                                name="remember"
                                valuePropName="checked"
                                className=' text-start p-0'
                                
                                >
                                <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <div>
                                    <div onClick={()=>{
                                        navigate('/register')
                                    }}><span>Register</span></div>
                                    
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