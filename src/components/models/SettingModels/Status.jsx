import React, { useState } from 'react';
import { Button, Modal, Col, ConfigProvider, Form, Input, Row, Popconfirm, Space, message } from 'antd';
import api from '../../api/api';

const AddStatus = ({ setfetchData, fetchData }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    const formHandler = (values) => {
        api.post('/statuses', values, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
        }).then((response) => {
            if (response.data) {
                form.resetFields();
                setOpen(false);
                success(response.data.message);
                fetchData();
            }
        }).catch(() => error('Add Status Fail !!!'));
    };

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button type="primary" onClick={() => setOpen(true)}>Add Status</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Add Status"
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

export function EditStatus({ idx, name, fetchData }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    const formHandler = (values) => {
        values.id = idx;
        api.put(`/statuses/${idx}`, values, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
        }).then((response) => {
            if (response.data) {
                fetchData();
                setOpen(false);
                success(response.data.message);
                onReset();
            }
        }).catch(() => error('Edit Status Fail !!!'));
    };

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button type="primary" onClick={() => setOpen(true)}>Edit</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Edit Status"
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

export default AddStatus;
