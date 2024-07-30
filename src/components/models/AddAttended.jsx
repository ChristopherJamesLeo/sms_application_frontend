

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message} from 'antd';
import axios from 'axios';
import $ from "jquery";
const AddAttended = () => {
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

    // start verify reg number
    let [regNumber , setRegNumber] = useState(null);

    function userRegHangler(value){
        setRegNumber(value.target.value);
    }
    
    function showUserInfo(value){
        
        if(value != null){
            return (
                <>
                    <div className='mb-3'> <span> Name - {value}  </span> & <span>NRC - </span> & <span> Student Point - </span> </div>
                </>
            )
        }else {
            return false;
        }
        
    }
    // end verify reg number 

    // start data
    let [dateTime,setDateTime] = useState(null);
    const onOk = (value,dateString) => {
        // console.log('onOk: ', dateString);
        setDateTime(dateString);
    };
    // end date

    const onReset = () => {
        form.resetFields();
    };

    function formHandler(values){
        values.datetime = dateTime;
        console.log(values);

        // const url = "https://666f5437f1e1da2be52288af.mockapi.io/SMS/users";
        // axios.post(url, values)
        // .then(response => {
        //     console.log('Data successfully posted:', response.data);
        //     onReset();
        //     setOpen(false);
        //     success();
        // }).catch(error => {
           
        //     error();
        // });
    }
  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            Add Attended
        </Button>
        {contextHolder}
        <Modal
            title="Add Attended Code"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            width={500}
        >
            {showUserInfo(regNumber)}
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
                            <Input placeholder="Please enter user name" onBlur={userRegHangler} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="course_id"
                            label="Course"
                            rules={[{ required: true, message: 'Please enter email' }]}
                        >
                            <Select placeholder="Choose Class" >
                                <Option value="1">Web development</Option>
                                <Option value="2">Linux</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="datetime"
                            label="Date"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Date Time',
                            },
                            ]}
                        >
                            <DatePicker
                                showTime
                                onChange={(value,dateString)=>{onOk(value,dateString)}}
                                style={
                                    {
                                        width : "100%"
                                    }
                                }
                                onOk={onOk}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="attcode"
                            label="Attended Code"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Attended Code',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Attended Code" />
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
export default AddAttended;