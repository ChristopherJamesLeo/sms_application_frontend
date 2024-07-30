

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message} from 'antd';
import axios from 'axios';
import $ from "jquery";
const AddCourseService = () => {
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
                                <Option value="1">Web development</Option>
                                <Option value="2">Linux</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="service_platform"
                            label="Choose Platform"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Email',
                            },
                            ]}
                        >
                            <Select placeholder="Choose Platform" >
                                <Option value="1">Telegram</Option>
                                <Option value="2">Messanger</Option>
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