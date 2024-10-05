

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message} from 'antd';
import axios from 'axios';
import $ from "jquery";
import api from '../api/api';
const AddAttended = ({fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    var [userId,setUserId] = useState(null);
    var [courses, setCourses] = useState([]);

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

    // create fecth data 
    async function modelHandler(){
        setOpen(true);

    }

    // end create fetch data


    // start verify reg number
    let [userdata, setUserData] = useState({});

    async function userRegHangler(value){
        // console.log(value.target.value);
        var getRegId = value.target.value;
        console.log(getRegId);
        try {
            // console.log(getRegId)
            const response = await api.get(`/attendant/checkuser/${getRegId}` , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            
            if(response){
                console.log(response.data);
                // console.log(response.data.userdata);
                let userdata = response.data.userdata;
                setUserId(userdata.id);
                setUserData(userdata);
                setCourses(response.data.userenrolls)
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

    }
    
    console.log(courses);
    function showUserInfo(value){
        
        if(value != null){
           
            return (
                <>
                    <div className='mb-3'> <span> Name - {value.name}  </span> & <span>Student Id - {value.regnumber}</span> </div>
                </>
            )
        }else {
            return false;;
        }
        
    }

    function couserselect(values){
        return (
            <Select placeholder="Choose Class" >
                {
                    values.map(function(course){
                        return (
                            <Option key={course.id} value={`${course.id}`}>{course.name}</Option>
                        )
                    })
                } 
            </Select>
        )

    }
    // end verify reg number 

    // start data
    let [dateTime,setDateTime] = useState(null);
    const onOk = (value,dateString) => {
        console.log('onOk: ', dateString);
        setDateTime(dateString);
        console.log(dateTime);
    };
    // end date

    const onReset = () => {
        form.resetFields();
    };

    async function formHandler(values){
        values.user_id = userId;
        values.date = dateTime;
        console.log(values);

        try {
            console.log(values);

            const response = await api.post('/attendants', values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                console.log(response.data);
                success(response.data.message);
                if(response.data.status == "fail"){
                    return false;
                }
                onReset();
                setOpen(false);
                fetchData();
                
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
    }
  return (
    <>
        <Button type="primary" onClick={modelHandler}>
            Add Attended
        </Button>
        {contextHolder}
        <Modal
            title="Add Attended Code"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => {
                setOpen(false);
                form.resetFields();
                setUserData(null);
            }}
            footer={null}
            width={500}
        >
            {showUserInfo(userdata)}
             <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                            <Form.Item
                                name="regId"
                                label="Student Id"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" onBlur={userRegHangler}/>
                            </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="course_id"
                            label="Course"
                            rules={[{ required: true, message: 'Please enter email' }]}
                        >
                            {couserselect(courses)}
                            
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="dateTime"
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
                            name="attendant_code"
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