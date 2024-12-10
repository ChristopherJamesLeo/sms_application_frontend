

import React, { useState , useEffect } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message} from 'antd';
import axios from 'axios';
import $ from "jquery";
import api from '../api/api';

const AddCourseService = ({categories,servicePlatforms,fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();



    const formHandler = async (values) => {
        values.service_type_id = 2;
        try {
            const response = await api.post('/services', values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    console.log("done")
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
                            name="course_id"
                            label="Choose Class"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                            ]}
                        >
                            <Select placeholder="Choose Class" >
                                {
                                    categories.map(function(categorie){
                                        return (
                                            <Option key={Math.floor(Math.random()*1000)} value={categorie.id} >{categorie.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
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
export default AddCourseService;