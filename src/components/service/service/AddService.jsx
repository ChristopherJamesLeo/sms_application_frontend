

import React, { useState , useEffect } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message} from 'antd';
import axios from 'axios';
import $ from "jquery";
import api from '../../api/api';

const AddService = ({categories,servicePlatforms,fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();



    const formHandler = async (values) => {
      
        try {
            const response = await api.post('/services', values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    
                    form.resetFields();
                    setOpen(false);
                    success(response.data.message);
                    fetchData();
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
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            Add Service Platform
        </Button>
        {contextHolder}
        <Modal
            title="Add Platform"
            
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            width={500}
        >
             <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="service_platform_id"
                            label="Choose Platform"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Email',
                            },
                            ]}
                        >
                            <Select placeholder="Choose Platform" >
                            {
                                    servicePlatforms.map(function(servicePlatform){
                                        return (
                                            <Option key={Math.floor(Math.random()*1000)} value={servicePlatform.id} >{servicePlatform.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="link"
                            label="Platform Link"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Link',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Link" />
                        </Form.Item>
                    </Col>
                </Row>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            
            </Form>
        </Modal>
    </>
  );
};
export default AddService;

export function EditService({id,fetchData}){
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    let [categories, setCategories] = useState([]);
    let [servicePlatforms, setServicePlatforms] = useState([]);

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();

    async function openModal (){
        setOpen(true);
        try {
            const response = await api.get(`/services/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                
                setCategories(response.data.categories);
                setServicePlatforms(response.data.servicePlatforms);
                form.setFieldsValue({
                    service_platform_id : response.data.services.serviceplatform.id,
                    link : response.data.services.name
                })
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
    const formHandler = async (values) => { 
        values.service_type_id = 1;
        values.course_id = 100;
        try {
            const response = await api.put(`/services/${id}`, values , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                success(response.data.message);
                setOpen(false);
                fetchData();

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
            <Button type="primary" onClick={openModal} size='small'>
                Edit
            </Button>
            {contextHolder}
            <Modal
                title="Add Platform"
                
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
                width={500}
                
            >
                 <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form} >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="service_platform_id"
                                label="Choose Platform"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Email',
                                },
                                ]}
                            >
                                <Select placeholder="Choose Platform" >
                                    {
                                        servicePlatforms.map(function(servicePlatform){
                                            return (
                                                <Option key={Math.floor(Math.random()*1000)} value={servicePlatform.id} >{servicePlatform.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                       
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="link"
                                label="Platform Link"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Link',
                                },
                                ]}
                            >
                                <Input placeholder="Please Enter Link" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                
                </Form>
            </Modal>
        </>
      );
}

export function DeleteService({id,fetchData}){

    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });
    const [open, setOpen] = useState(false);

    function openDeleteModel (){
        setOpen(true);
    }

    const yesHandler = async () => {
        try {
            const response = await api.delete(`/services/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                fetchData();
                setOpen(false);
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
    };
    function noHandler(){
        setOpen(false);
    }

    return (
        <>
      
            <Button type="primary" size="small" onClick={openDeleteModel}>
                Delete
            </Button>
            {contextHolder}
            <Modal
                title="Delete Service"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                }}
                footer={null}
                width={500}
            >
                <div>
                    <span>Are you sure to delete this announcement ?</span>
                    <div className="space-x-3 mt-5">
                    
                        <Button type="primary" onClick={noHandler}>
                            No
                        </Button>
                        <Button type="primary" onClick={yesHandler}>
                            Yes
                        </Button>
                    </div>
                </div>
            </Modal>
        </>

        
    )
}