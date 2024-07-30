import React, { useState } from 'react';
import { Button, Modal , Col, ConfigProvider, Form, Input, Row, Popconfirm, Space , message , InputNumber} from 'antd';
import UserManualVerification from './UserManualVerification';
import axios from 'axios';
import $ from "jquery";


// start img upload

// end img upload 

const text = 'Are You Sure To Add This Amount ?';
const description = 'Click "YES" button';

const AddPoints = ({userid}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

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


    // end submit btn

    const onReset = () => {
        form.resetFields();
    };

    function formConfirm (){
        form.submit();
        
    }
    function formHandler(values){
        console.log(values);
        setOpen(false);
        form.resetFields();
        // const url = "https://666f5437f1e1da2be52288af.mockapi.io/SMS/users";
        // axios.post(url, values)
        // .then(response => {
        //     console.log('Data successfully posted:', response.data);
        //     onReset();
        //     setOpen(false);
        //     success();
        // }).catch(error());
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
                    Point Add
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
                            name="name"
                            label="Name"
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
                                defaultValue='0'
                                min="0"
                                max="100000000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="remark"
                            label="Remark"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Remark',
                            },
                            ]}
                        >
                           <Input.TextArea rows={4} placeholder="Please enter Remark" />
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
export default AddPoints;