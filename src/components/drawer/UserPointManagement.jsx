import React, { useEffect, useState } from 'react';
import { Col, Row, Space, ConfigProvider, message, Modal, Form, InputNumber, Button, Popconfirm } from 'antd';
import api from '../api/api';

export default function UserPointManagement({ userdata, userid }) {
    const [userPoint, setUserPoint] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (userdata?.userpoint) setUserPoint(userdata.userpoint);
    }, [userdata]);

    const notify = (type, msg) => messageApi.open({ type, content: msg });

    const handleFormSubmit = async (url, values, onSuccess) => {
        try {
            const { data } = await api.put(url, { ...values, user_id: userid }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (data?.userpoint) {
                setUserPoint(data.userpoint);
                onSuccess();
            }
            notify('success', data.message || 'Operation successful');
        } catch (err) {
            notify('error', err.response ? `Error: ${err.response.status}` : 'Request failed');
        }
    };

    const ActionModal = ({ title, url, name, color, buttonText }) => {
        const [open, setOpen] = useState(false);
        const [form] = Form.useForm();

        return (
            <>
                <ConfigProvider theme={{ token: { colorPrimary: color } }}>
                    <Button type="primary" onClick={() => setOpen(true)}>{buttonText}</Button>
                </ConfigProvider>
                <Modal
                    title={title}
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => { setOpen(false); form.resetFields(); }}
                    width={500}
                    footer={null}
                >
                    <Form
                        layout="vertical"
                        hideRequiredMark
                        form={form}
                        onFinish={(values) => handleFormSubmit(url, values, () => {
                            setOpen(false);
                            form.resetFields();
                        })}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name={name}
                                    rules={[{ required: true, message: `Please Enter Amount` }]}
                                >
                                    <InputNumber style={{ width: "100%" }} min="0" max="100000000000" step="1000" stringMode />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Space>
                            <Popconfirm
                                placement="bottomLeft"
                                title={title}
                                okText="Yes"
                                cancelText="No"
                                okType='primary'
                                onConfirm={() => form.submit()}
                            >
                                <Button type="primary">Submit</Button>
                            </Popconfirm>
                            <Button onClick={() => form.resetFields()}>Reset</Button>
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
                {['topup', 'transit', 'frozen'].map((type, i) => (
                    <Col span={8} key={i}>
                        <div className='py-5 bg-blue-100 rounded'>
                            <span className='text-lg'>{`${type.charAt(0).toUpperCase() + type.slice(1)} Point`}</span>
                            <div className='mt-3 text-lg'>{userPoint[type] || "0"}</div>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="mt-5 flex justify-center">
                <Space>
                    <ActionModal title="Add Point" url={`/userpoints/topup/${userid}`} name="topup" color="#a6d96a" buttonText="Top Up" />
                    <ActionModal title="Freeze Point" url={`/userpoints/frozen/${userid}`} name="frozen" color="#71c2cc" buttonText="Freeze" />
                    <ActionModal title="Unfreeze Point" url={`/userpoints/unfreeze/${userid}`} name="unfreeze" color="#5699d2" buttonText="Unfreeze" />
                    <ActionModal title="Deduct Point" url={`/userpoints/deduct/${userid}`} name="deduct" color="#bb2124" buttonText="Deduct" />
                </Space>
            </div>
        </>
    );
}
