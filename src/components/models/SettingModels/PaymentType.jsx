import React, { useState } from 'react';
import { Button, Modal, Col, ConfigProvider, Form, Input, Row, Popconfirm, Space, message } from 'antd';
import api from '../../api/api';

const AddPaymentType = ({ fetchData }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    const formHandler = async (values) => {
        try {
            const response = await api.post('/paymenttypes', values, {
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
                <Button type="primary" onClick={() => setOpen(true)}>Add Payment Type</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Add Payment Type"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter categories" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Popconfirm
                            placement="bottomLeft"
                            title="Are You Sure To Add This Amount?"
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

export function EditPaymentType({ idx, name, fetchData }) {
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
            const response = await api.put(`/paymenttypes/${idx}`, values, {
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
                <Button type="primary" onClick={() => setOpen(true)}>Edit</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Edit Payment Type"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark
                    onFinish={formHandler}
                    form={form}
                    initialValues={{ name }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter categories" />
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

export default AddPaymentType;
