import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Image ,InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPackage = ({fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

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
        setQuillValue("");
    };

    const formHandler = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('point', values.point);
        formData.append('discount', values.discount);
        formData.append('description', quillValue);
        if (selectedFile) {
            formData.append('image', selectedFile); 
        }
        setLoading(true);
        try {
            const response = await api.post('/packages', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response) {
                // console.log(response.data);
                success(response.data.message);
                setLoading(false);
                setOpen(false);
                form.resetFields();
                setPreviewUrl(null); // Clear the preview image
                setSelectedFile(null); // Clear the selected file
                setQuillValue("");
                fetchData();
                // console.log(response.data.message);
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
                Add Package
            </Button>
            {contextHolder}
            <Modal
                title="Add Package"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => {
                    setOpen(false);
                    onReset();
                }}
                footer={null}
                width={600}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form} initialValues={
                    {
                        "point" : 0,
                        "price" : 0,
                        "discount" : 0
                    }
                }>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Package Name"
                                rules={[{ required: true, message: 'Please enter package name' }]}
                            >
                                <Input placeholder="Please enter package name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item
                                        name="price"
                                        label="Package Price"
                                        rules={[{ required: true, message: 'Please enter package price' }]}
                                    >
                                        <InputNumber
                                            style={
                                                    {
                                                width: "100%",
                                                }
                                            }
                                            min="0"
                                            max="100000000000"
                                            step="1000"
                                            stringMode
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="point"
                                        label="Package Point"
                                        rules={[{ required: true, message: 'Please enter package point' }]}
                                    >
                                        <InputNumber
                                            style={
                                                    {
                                                width: "100%",
                                                }
                                            }
                                            min="0"
                                            max="100000000000"
                                            step="1000"
                                            stringMode
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="discount"
                                        label="Package Discount"
                                        rules={[{ required: true, message: 'Please enter package discount' }]}
                                    >
                                        <InputNumber
                                            style={
                                                    {
                                                width: "100%",
                                                }
                                            }
                                            min="0"
                                            max="100000000000"
                                            step="1000"
                                            stringMode
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
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
                        <Button type="primary" htmlType="submit"  loading={loading} >
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

export default AddPackage;
