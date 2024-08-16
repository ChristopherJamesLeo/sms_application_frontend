
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button , Col, Row, Space , ConfigProvider , message , Modal , Form, Input,Popconfirm, InputNumber} from 'antd';
import api from '../api/api';

import {Frozen,Unfreeze,Deduct} from '../models/userPointManagement/PointManagement';



export default function UserPointManagement({userdata,userid,formHandler}){


    var getUserPoint = userdata;
    console.log(getUserPoint);

    var [userPoint,setUserPoint] = useState({});

    useEffect(()=>{
        setUserPoint(getUserPoint.userpoint);
    },userdata);

    console.log(userPoint);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    function TopUp ()  {
        // console.log(userid);
    
        var idx = userid;
    
    
        const [open, setOpen] = useState(false);
        const [form] = Form.useForm();
    

        // end submit btn
    
        const onReset = () => {
            form.resetFields();
        };
    
        function formConfirm (){
            form.submit();
            
        }
        let formHandler= async (values) => {
            
            values.user_id = idx;
            console.log(idx);
            console.log(values);
            try {
                console.log(idx);
                const response = await api.put(`/userpoints/topup/${idx}`, values, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
                });
                if (response.data) {
                    if (response.data) {
                        console.log(response.data.userpoint);
                        // console.log(response.data.message)
                        if(!response.data.userpoint){
                            setUserPoint(getUserPoint.userpoint);
                        }else {
                            setUserPoint(response.data.userpoint)
                            setOpen(false);
                            form.resetFields();
                        }
                        
                        success(response.data.message);
    
                    }
                } else {
                    error("Edit failed.");
                }
        
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 404) {
                        error("Resource not found (404).");
                    } else {
                        error(`Error: ${err.response.status}`);
                    }
                } else if (err.request) {
                    error("No response received from server.");
                } else {
                    error("Error in setting up request.");
                }
            }
            
    
        }
    
        return (
            <>
                <ConfigProvider 
                    theme={{
                        token: {
                        colorPrimary: '#1677ff', 
                        },
                    }}
                >
                    <Button type="primary" onClick={() => setOpen(true)}>
                        Top Up
                    </Button>
                </ConfigProvider>
                {/* error message */}
                    {contextHolder}
                {/* error message */}
                <Modal
                    title="Add Point"
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => {
                        setOpen(false);
                        form.resetFields();
                    }}
                    width={500}
                    footer={null}
                >
                    <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="topup"
                                // label="Top Up Point"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Amount',
                                },
                                ]}
                            >
                                <InputNumber
                                    style={
                                            {
                                        width: "100%",
                                        }
                                    }
                                    min="0"
                                    max="100000000000"
                                    step="1000"
                                    stringMode
                                />
                            </Form.Item>
                        </Col>
                       
                    </Row>
                    <Space>
                        <Popconfirm
                            placement="bottomLeft"
                            title="Add Point"
                            description="Are you sure to Add"
                            okText="Yes"
                            cancelText="No"
                            okType='primary'
                            onConfirm={formConfirm}
                        >
                            <Button type="primary" htmlType="button">
                                Submit
                            </Button>
                        </Popconfirm>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                
                </Form>
                    
                </Modal>
            </>
        );
    };

    

    return (
        <>
            <Row gutter={16} className='text-center'>
                {contextHolder}
                <Col span={8}>
                    <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Avaliable Point </span>
                        <div className='mt-3 text-lg'>
                            {userPoint ? userPoint.topup : "0"}
                        </div>
                    </div>
                    
                </Col>
                <Col span={8}>
                    <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Transaction Point </span>
                        <div className='mt-3 text-lg'>
                            {userPoint ? userPoint.transit : "0"}
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Freezed Point </span>
                        <div className='mt-3 text-lg'>
                            {userPoint ? userPoint.frozen : "0"}
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="mt-5 flex justify-center">
                <Space>
                
                    {
                        TopUp()
                    }
                </Space>
            </div>
        </>
    )
}