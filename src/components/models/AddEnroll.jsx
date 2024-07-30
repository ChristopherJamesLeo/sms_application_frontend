import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , Image , Divider} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddEnroll = () => {
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
        });
    };

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

    const [paymentType, setPaymentType] = useState(false);

    function paymentHandle(value){
        setPaymentType(value);

    }

    function paymentTypeRender(value){
        if(value == "1"){
            return (
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="image"
                            label="User Image"
                            rules={[{ required: true, message: 'Please Enter Receipt' }]}
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
            ) 
            
        } else if(value == "2"){
            return (
                <div className='mb-3'>
                    
                </div>
            );
        } else {
            return false;
        }
    }

    function showPaymentMethod(value){
        if(value == "1"){
            return (
                <Col span={24}>
                    <Form.Item
                        name="payment_method"
                        label="Payment Method"
                        rules={[{ required: true, message: 'Please Payment Method' }]}
                    >
                        <Select placeholder="Choose Payment Method">
                            <Option value="1">KBZ pay</Option>
                            <Option value="2">Wave Pay</Option>
                        </Select>
                    </Form.Item>
                </Col>
            ) 
            
        } else {
            return false;
        }
    }

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

    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
        setPaymentType(null);
        setRegNumber(null)
    };

    const formHandler = (values) => {
        console.log(values);
        // const url = "https://66a6acfe23b29e17a1a342ff.mockapi.io/sms/user/image";
        // const url = "";
        // axios.post(url, values)
        //     .then(response => {
        //         console.log('Data successfully posted:', response.data);
        //         onReset();
        //         setOpen(false);
        //         success();
        //     }).catch(error());
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Add Enroll
            </Button>
            {contextHolder}
            <Modal
                title="Add Enroll"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                    form.resetFields();
                    setPreviewUrl(null);
                    setPaymentType(null);
                    setRegNumber(null);
                }}
                footer={null}
                width={500}
            >
                {showUserInfo(regNumber)}
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="reg_number"
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
                                <Select placeholder="Choose Class" >
                                    <Option value="1">Mobile Banking</Option>
                                    <Option value="2">Point</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="payment_type"
                                label="Payment Type"
                                rules={[{ required: true, message: 'Please Payment Type' }]}
                            >
                                <Select placeholder="Choose Payment Type" onChange={paymentHandle}>
                                    <Option value="1">Mobile Banking</Option>
                                    <Option value="2">Point</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        {showPaymentMethod(paymentType)}
                        
                    </Row>
                    
                    <Row gutter={16}>
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
                    {paymentTypeRender(paymentType)}
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

export default AddEnroll;
