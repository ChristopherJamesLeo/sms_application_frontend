

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
const Adduser = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            Add User
        </Button>
        <Modal
            title="Add User"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
        >
             <Form layout="vertical" hideRequiredMark>
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
                </Form>
        </Modal>
    </>
  );
};
export default Adduser;