

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message , Upload , Image , InputNumber} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import $ from "jquery";
const AddLeave = () => {
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

    // start image preview
    const [previewUrl, setPreviewUrl] = useState(null);

    const beforeUpload = (file) => {
        // Read the selected file as a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        // Prevent the file from being uploaded immediately
        return false;
    };

    // end image preview

    // start data
    let [dateTime,setDateTime] = useState(null);
    const onOk = (value,dateString) => {
        // console.log('onOk: ', dateString);
        setDateTime(dateString);
    };
    // end date

    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null);
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
            Add Leave
        </Button>
        {contextHolder}
        <Modal
            title="Add Leave"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => {
                setOpen(false);
                form.resetFields();
                setPreviewUrl(null);
            }}
            footer={null}
            width={800}
        >
            {showUserInfo(regNumber)}
             <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                <Row gutter={16}>
                    <Col span={12}>
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
                            <Col span={24}>
                                <Form.Item
                                    name="datetime"
                                    label="Date Time"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter Phone',
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
                                    name="description"
                                    label="Description"
                                    rules={[{ required: true, message: 'Please enter description' }]}
                                >
                                    <Input.TextArea rows={4} placeholder="Please enter description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                                
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="image"
                                    label="User Image"
                                >
                                    <Upload 
                                        beforeUpload={beforeUpload}
                                        maxCount={1}
                                        accept="image/png, image/jpeg, image/jpg"
                                    >
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                    </Upload>
                                </Form.Item>
                                {previewUrl && (
                                    <div className={`mb-3 py-3 w-100 flex justify-center border-dashed border-2 border-gray-200 `}>
                                        <Image src={previewUrl} alt="Image preview" style={{ maxWidth: '300px', maxHeight: '300px' , }} />
                                    </div>
                                )}
                            </Col>
                        </Row>
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
export default AddLeave;