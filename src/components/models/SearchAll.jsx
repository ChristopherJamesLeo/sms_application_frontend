

import React, { useState } from 'react';
import { Button, Modal , Col, Form, Input, Row, Space , message} from 'antd';
import axios from 'axios';
import {SearchOutlined} from '@ant-design/icons';
import $ from "jquery";
const SearchAll = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'User Add Successful',
        });
    };
    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'User Add Fail',
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    function formHandler(values){
        const url = "https://666f5437f1e1da2be52288af.mockapi.io/SMS/users";
        axios.post(url, values)
        .then(response => {
            console.log('Data successfully posted:', response.data);
            onReset();
            setOpen(false);
            success();
        }).catch(error => {
           
            error();
        });
    }
  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            <SearchOutlined />
        </Button>
        {contextHolder}
        <Modal
            title="Add User"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            width={1000}
        >
             <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                <Row gutter={16}>
                    <Col span={12}>
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
                            <Input placeholder="Please enter user name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Email',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Email" />
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Phone',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Phone" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="emergency"
                            label="Emergency Contact Number"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Phone',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Phone" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Address',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Address" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                            {
                                required: true,
                                message: 'please enter url description',
                            },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
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
export default SearchAll;