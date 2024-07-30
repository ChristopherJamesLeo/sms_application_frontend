import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , DatePicker} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddRecordVideo = () => {
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

    // start data
    let [dateTime,setDateTime] = useState(null);
    const onOk = (value,dateString) => {
        // console.log('onOk: ', dateString);
        setDateTime(dateString);
    };
    // end date

    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
    };

    const formHandler = (values) => {
        values.datetime = dateTime;
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
                Add Video
            </Button>
            {contextHolder}
            <Modal
                title="Add Video"
                
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                    form.resetFields();
                    setPreviewUrl(null);
                }}
                footer={null}
                width={500}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
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
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="image"
                                label="Select Video"
                            >
                                <Upload 
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    accept="video/mp4"
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>
                            {previewUrl && (
                                <div className={`mb-3 py-3 w-100 flex justify-center border-dashed border-2 border-gray-200 `}>
                                    <video src={previewUrl} alt="Video preview" style={{ maxWidth: '300px', maxHeight: '300px' , }} autoPlay/>
                                </div>
                            )}
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

export default AddRecordVideo;
