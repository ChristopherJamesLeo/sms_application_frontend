

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message} from 'antd';
import axios from 'axios';
import $ from "jquery";
const AddActivity = () => {
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
            Add Activities
        </Button>
        {contextHolder}
        <Modal
            title="Add Iframe"
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
                            name="name"
                            label="Name"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                            ]}
                        >
                            <Input placeholder="Please enter iFrame" />
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
export default AddActivity;