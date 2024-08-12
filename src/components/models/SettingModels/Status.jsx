import React, { useState } from 'react';
import { Button, Modal , Col, ConfigProvider, Form, Input, Row, Popconfirm, Space , message , InputNumber} from 'antd';

import axios from 'axios';
import $ from "jquery";
import api from '../../api/api';


// start img upload

// end img upload 

const text = 'Are You Sure To Add This Amount ?';
const description = 'Click "YES" button';

const AddStatus = ({setfetchData,fetchData}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
          type: 'success',
          content: message,
        });
    };
    const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
        })
    };


    // end submit btn

    const onReset = () => {
        form.resetFields();
    };

    function formConfirm (){
        form.submit();
        
    }
    function formHandler(values) {
        // console.log(values);
        api.post('/statuses', values, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
        })
        .then((response) => {
            const data = response.data;
            console.log(data)
            if (data) {
                // setOpen(false);
                form.resetFields();
                onReset();
                setOpen(false);
                success(data.message);
                fetchData()
            }
        })
        .catch(() => {
            error('Add Status Fail !!!');
        });
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
                    Add Status
                </Button>
            </ConfigProvider>
            {/* error message */}
                {contextHolder}
            {/* error message */}
            <Modal
                title="Add Status"
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
                            name="name"
                            label="Name"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                            ]}
                        >
                            <Input placeholder="Please enter categories" />
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Space>
                    <Popconfirm
                        placement="bottomLeft"
                        title={text}
                        description={description}
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


export function EditStatus ({idx,name,fetchData}){
    // console.log(idx,name)
    // console.log('hello');
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
          type: 'success',
          content: message,
        });
    };
    const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
        })
    };


    // end submit btn

    const onReset = () => {
        form.resetFields();
    };

    function formConfirm (){
        form.submit();
        
    }
    const [editData,setEditData] = useState(null);
    function formHandler(values) {
        values.id = idx;
        // console.log(values);
        api.put(`/statuses/${idx}`, values, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
        })
        .then((response) => {
            const data = response.data;
            // console.log(data)
            if (data) {
                setEditData(data);
                fetchData();
                setOpen(false);
                success(data.message);
                form.resetFields();
            }
        })
        .catch(() => {
            error('Edit Status Fail !!!');
        });
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
                    Edit
                </Button>
            </ConfigProvider>
            {/* error message */}
                {contextHolder}
            {/* error message */}
            <Modal
                title="Edit Status"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark 
                onFinish={formHandler} 
                form={form}
                initialValues={
                    {
                        name : name
                    }
                }
                >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                            ]}
                        >
                            <Input placeholder="Please enter categories" />
                        </Form.Item>
                    </Col>
                </Row>
                <Space>
                    <Popconfirm
                        placement="bottomLeft"
                        title={text}
                        description={description}
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

export default AddStatus;