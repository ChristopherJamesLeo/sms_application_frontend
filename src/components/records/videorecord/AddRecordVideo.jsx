import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , DatePicker} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const AddRecordVideo = ({courses,fetchingData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);


    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

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

    const [quillValue, setQuillValue] = useState('');


    function QuillValue(content){
        setQuillValue(content)
        
    }

    const onReset = () => {
        form.resetFields();
        setQuillValue('');
        setPreviewUrl(null); // Clear the preview image
    };

    const formHandler = async (values) => {
        values.datetime = dateTime;
        values.remark = quillValue ? quillValue : "No Remark";
        console.log(values);
        try {
            const response = await api.post('/videos', values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    console.log(response.data);
                    setOpen(false);
                    form.resetFields();
                    fetchingData()
                    success(response.data.message);
                }
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
        // setOpen(false);
        // form.resetFields();
        
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
                                    {
                                        courses.map(function(course,id){
                                            return  <Select.Option value={course.id} key={course.id}>{course.name}</Select.Option>
                                        })
                                    }
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
                        {/* <Col span={24} className='mt-4'>
                            <Form.Item
                                name="link"
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
                        </Col> */}
                        <Col span={24} className='mt-4'>
                            <Form.Item
                                    name="link"
                                    label="Link"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Student ID',
                                    },
                                    ]}
                                >
                                    <Input placeholder="Please enter user name" />
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

export default AddRecordVideo;

