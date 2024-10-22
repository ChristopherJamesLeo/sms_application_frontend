import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddAnnouncement = ({fetchingData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    // Image preview and file handling
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const beforeUpload = (file) => {
        // Read the selected file as a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        // Store the file for uploading later
        setSelectedFile(file);

        // Prevent immediate upload
        return false;
    };

    // Quill editor state
    const [quillValue, setQuillValue] = useState('');

    function QuillValue(content) {
        setQuillValue(content);
    }

    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
        setSelectedFile(null); // Clear the selected file
    };

    const formHandler = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', quillValue);
        if (selectedFile) {
            formData.append('image', selectedFile); 
        }

        try {
            const response = await api.post('/announcements', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response) {
                success(response.data.message);
                setOpen(false);
                setQuillValue("");
                form.resetFields();
                fetchingData();
                console.log(response.data.message);
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
                    setOpen(false);
                    onReset();
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
                                    placeholder="Description"
                                    style={{
                                        marginBottom: '60px',
                                        height: '200px',
                                    }}
                                    value={quillValue}
                                    modules={{
                                        toolbar: [
                                            [{ header: '1' }, { header: '2' }, { font: [] }],
                                            [{ size: [] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ align: [] }],
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
                            <Form.Item name="image" label="Poster">
                                <Upload
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    accept="image/png, image/jpeg, image/jpg"
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>
                            {previewUrl && (
                                <div className="mb-3 py-3 w-100 flex justify-center border-dashed border-2 border-gray-200">
                                    <Image
                                        src={previewUrl}
                                        alt="Image preview"
                                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                                    />
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
