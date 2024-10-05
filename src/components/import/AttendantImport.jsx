import React, { useState } from 'react';
import { Button, Modal, Col, Form, Upload, Row, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api/api';

const AttendantImport = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState(null);

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => {
        form.resetFields();
        setFile(null);
    };

    async function formHandler() {
        if (!file) {
            error("Please select a file.");
            return;
        }

        // Create FormData and append the file
        const formData = new FormData();
        formData.append('excelfile', file);

        try {
            const response = await api.post('/attendant/import', formData, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                },
            });
            
            if (response) {
                success(response.data.message);
                setFile(null); // Clear the file after successful upload
                setOpen(false); // Close the modal
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set selected file to state
    };

    const triggerFileInput = () => {
        document.getElementById('excelfile').click();
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Import
            </Button>
            {contextHolder}
            <Modal
                title="Insert"
                open={open}
                onCancel={() => { 
                    form.resetFields();
                    setFile(null);
                    setOpen(false);
                }}
                footer={null}
                width={500}
            >
                <Form layout="vertical" onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24} className='mb-3'>
                            <input
                                type="file"
                                name="excelfile"
                                id="excelfile"
                                accept=".xlsx,.xls"
                                style={{ display: 'none' }} // Hide the actual file input
                                onChange={handleFileChange} 
                            />
                            <Button icon={<UploadOutlined />} onClick={triggerFileInput} className='mb-3'>
                                Select File
                            </Button>

                            {file && <p>Selected file: {file.name}</p>}
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

export default AttendantImport;
