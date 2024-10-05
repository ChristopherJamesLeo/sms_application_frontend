import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


const AddAnnouncement = () => {
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

    // start quill
    const [quillValue, setQuillValue] = useState('');


    function QuillValue(content){
        setQuillValue(content)
        
    }

    function getQuilValue(){
        console.log(quillValue);
    }
    // end quill

    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
    };

    const formHandler = (values) => {
        values.description = quillValue;
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
                Add Announcement
            </Button>
            {contextHolder}
            <Modal
                title="Add Announcement"
                
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                    form.resetFields();
                    setPreviewUrl(null);
                }}
                footer={null}
                width={1000}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Please enter title' }]}
                            >
                                <Input placeholder="Please enter title" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <ReactQuill
                                    name="description"
                                    placeholder='Syllabus'
                                    style={
                                        {
                                            marginBottom : "60px",
                                            height: "200px"
                                        }
                                    }
                                    value={quillValue}
                                    modules={{
                                        
                                        toolbar: [
                                        [{ header: '1' }, { header: '2' }, { font: [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],[{ 'align': [] }],
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        ['link', 'image'],
                                        ['code-block'],
                                        ['clean'],
                                        ],
                                    }}
                                    onChange={QuillValue}
                                />
                             </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="image"
                                label="Poster"
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
                                    <img src={previewUrl} alt="Image preview" style={{ maxWidth: '300px', maxHeight: '300px' , }} />
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

export default AddAnnouncement;
