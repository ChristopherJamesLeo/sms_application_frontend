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
    
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
    
        try {
            console.log(values);
            const response = await api.put(`/announcements/${announcement.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    // "Content-Type " : 'multipart/form-data',
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
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
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