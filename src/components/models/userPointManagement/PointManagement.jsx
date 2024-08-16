import React, { useState } from 'react';
import { Button, Modal , Col, ConfigProvider, Form, Input, Row, Popconfirm, Space , message , InputNumber} from 'antd';
import api from '../../api/api';
import UserPointManagement from '../../drawer/UserPointManagement';

// start img upload

// end img upload 

const text = 'Are You Sure To Add This Amount ?';
const description = 'Click "YES" button';

export default function TopUp ({userid,setUserPoint})  {
    // console.log(userid);

    var idx = userid;


    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    // end submit btn

    const onReset = () => {
        form.resetFields();
    };

    function formConfirm (){
        form.submit();
        
    }
    let formHandler= async (values) => {
        console.log(idx);
        try {
            // console.log(idx);
            const response = await api.put(`/userpoints/topup/${idx}`, values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    console.log(response.data.userpoint);
                    console.log(response.data.message)
                    setUserPoint(response.data.userpoint)
                    setOpen(false);
                    form.resetFields();
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
        setOpen(false);
        form.resetFields();

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


export function Frozen({ idx, point, fetchData }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    const formHandler = async (values) => {
        values.id = idx;
        try {
            const response = await api.put(`/points/${idx}`, values, {
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
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button type="primary" onClick={() => setOpen(true)}>Freeze Point</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Edit Categories"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark
                    onFinish={formHandler}
                    form={form}
                    initialValues={{ point : point }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="frozen"
                                // label="Point"
                                rules={[{ required: true, message: 'Please enter point' }]}
                            >
                                <Input placeholder="Please enter point" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Popconfirm
                            placement="bottomLeft"
                            title="Are You Sure To Add This Status?"
                            description="Click 'YES' button"
                            okText="Yes"
                            cancelText="No"
                            okType="primary"
                            onConfirm={formConfirm}
                        >
                            <Button type="primary" htmlType="button">Submit</Button>
                        </Popconfirm>
                        <Button htmlType="button" onClick={onReset}>Reset</Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};

export function Unfreeze({ idx, point, fetchData }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    const formHandler = async (values) => {
        values.id = idx;
        try {
            const response = await api.put(`/points/${idx}`, values, {
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
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button type="primary" onClick={() => setOpen(true)}>Unfreeze</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Edit Categories"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark
                    onFinish={formHandler}
                    form={form}
                    initialValues={{ point : point }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="unfreeze"
                                // label="Point"
                                rules={[{ required: true, message: 'Please enter point' }]}
                            >
                                <Input placeholder="Please enter point" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Popconfirm
                            placement="bottomLeft"
                            title="Are You Sure To Add This Status?"
                            description="Click 'YES' button"
                            okText="Yes"
                            cancelText="No"
                            okType="primary"
                            onConfirm={formConfirm}
                        >
                            <Button type="primary" htmlType="button">Submit</Button>
                        </Popconfirm>
                        <Button htmlType="button" onClick={onReset}>Reset</Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};

export function Deduct({ idx, point, fetchData }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    const formHandler = async (values) => {
        values.id = idx;
        try {
            const response = await api.put(`/points/${idx}`, values, {
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
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button type="primary" onClick={() => setOpen(true)}>Deduct</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Edit Categories"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark
                    onFinish={formHandler}
                    form={form}
                    initialValues={{ point : point }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="deduct"
                                // label="Point"
                                rules={[{ required: true, message: 'Please enter point' }]}
                            >
                                <Input placeholder="Please enter point" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Popconfirm
                            placement="bottomLeft"
                            title="Are You Sure To Add This Status?"
                            description="Click 'YES' button"
                            okText="Yes"
                            cancelText="No"
                            okType="primary"
                            onConfirm={formConfirm}
                        >
                            <Button type="primary" htmlType="button">Submit</Button>
                        </Popconfirm>
                        <Button htmlType="button" onClick={onReset}>Reset</Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};