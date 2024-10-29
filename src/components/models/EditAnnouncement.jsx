import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Image , Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const EditAnnouncement = ({announcement,fetchingData}) => {
    // console.log(announcement);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [visibilities, setVisibilities] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    // start edit fetch data
    async function editHandler(){
        setOpen(true);

        try {
            console.log("hello");

            const response = await api.get('/announcement/edit', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                setVisibilities(response.data.visibilities)
            } else {
                error("Data fetching failed.");
            }
        } catch (err) {
            if (err.response) {
                error(err.response.status === 404 ? "Resource not found (404)." : `Error: ${err.response.status}`);
            } else if (err.request) {
                error("No response received from server.");
            } else {
                error("Error in setting up request.");
            }
        } finally {
            setLoading(false);
        }

    }
    // end edit fetch data

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

        console.log(file);
        setSelectedFile(file);

        // console.log(selectedFile);

        // Prevent immediate upload
        return false;
    };

    // Quill editor state
    const [quillValue, setQuillValue] = useState(announcement.description);

    function QuillValue(content) {
        setQuillValue(content);
    }

    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
        setSelectedFile(announcement.description); // Clear the selected file
    };

    const formHandler = async (values) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('visibility_id', values.visibility_id);
        formData.append('description',quillValue);
        formData.append("public_id",announcement.public_id);
    
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
    
        try {
            console.log(values);
            const response = await api.post(`/announcement/update/${announcement.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    "Content-Type " : 'multipart/form-data',
                },
            });
    
            if (response) {
                console.log(response.data.message);
                success("Announcement updated successfully!");
                setOpen(false);
                fetchingData(); // Refresh data after successful update
            }
        } catch (err) {
            if (err.response) {
                error(`Error: ${err.response.data.message}`);
            } else {
                error("No response received from server.");
            }
        }
    };
    

    return (
        <>
            <Button type="primary" size='small' onClick={editHandler}>
                Edit
            </Button>
            {contextHolder}
            <Modal
                title="Edit Announcement"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => {
                    setOpen(false);
                    onReset();
                }}
                footer={null}
                width={1000}
            >
                <Form layout="vertical" hideRequiredMark 
                initialValues={
                    {
                        title : announcement.title,
                        visibility_id : announcement.visibility.name == "Public" ? 0 : announcement.visibility.id,

                    }
                }
                 onFinish={formHandler} form={form} >
                    <Row gutter={16}>
                        <Col span={12}>
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

                                <Col span={24}>
                                    <Form.Item name="visibility_id" label="Visibility">
                                        <Select placeholder="Please choose the Visibility">
                                            <Select.Option key={Math.random()*1000} value={0}>Public</Select.Option>
                                            {
                                                visibilities.map(function(visibilitie,id){
                                                    return <Select.Option key={id} value={visibilitie.id}>{visibilitie.name}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item>
                                        <ReactQuill
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
                        </Col>
                        <Col span={12}>
                            <Image
                                width="100%"
                                // src="{announcement.image}"
                                public_id = {`${announcement.public_id}`}
                                src={`${announcement.image}`}
                                fallback="data:image/png;base64,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"
                            />,
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

export default EditAnnouncement;


export function DeleteAnnouncement({announcementId,fetchingData}){
    const [messageApi, contextHolder] = message.useMessage();
    
    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    const [open, setOpen] = useState(false);

    function openDeleteModel (){
        setOpen(true);
    }

    async function yesHandler (){
        try {

            console.log(announcementId);
            const response = await api.delete(`/announcements/${announcementId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    success(response.data.message);
                    fetchingData()
                    setOpen(false);
                    
                }
            } else {
                error("Delete failed.");
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

    function noHandler(){
        setOpen(false);
    }
    return (
        <>
      
            <Button type="primary" size="small" onClick={openDeleteModel}>
                Delete
            </Button>
            {contextHolder}
            <Modal
                title="Delete Video"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                }}
                footer={null}
                width={500}
            >
                <div>
                    <span>Are you sure to delete this announcement ?</span>
                    <div className="space-x-3 mt-5">
                    
                        <Button type="primary" onClick={noHandler}>
                            No
                        </Button>
                        <Button type="primary" onClick={yesHandler}>
                            Yes
                        </Button>
                    </div>
                </div>
            </Modal>
        </>

        
    )
}