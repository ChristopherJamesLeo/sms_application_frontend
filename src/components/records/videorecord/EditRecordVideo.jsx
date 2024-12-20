
import React , { useState} from "react";
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , DatePicker} from 'antd';
import api from '../../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import moment from 'moment';


export default function EditRecordVideo({videoLink,videoDate,videoId,videoRemark,courseId,visibility_id,fetchingData}){
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [courses,setCourses] = useState([]);
    const [visibilities,setVisibilities] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [formInitialVal,setformInitialVal] = useState({});
    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // console.log(videoId,courseId,visibility_id)
    // start data
    let [dateTime,setDateTime] = useState(null);
    const onOk = (value,dateString) => {
        // console.log('onOk: ', dateString);
        setDateTime(dateString);
    };


    // end date

    // start default date
    const defaultDateString = videoDate;

    const defaultDate = moment(defaultDateString, "YYYY-MM-DD HH:mm:ss");
    // end default date



    const onReset = () => {
        form.resetFields();
        setQuillValue(videoRemark);
        // setPreviewUrl(null); // Clear the preview image
    };


    const [quillValue, setQuillValue] = useState(videoRemark);


    function QuillValue(content){
        setQuillValue(content)
        
    }

    async function editHandler(){
        setOpen(true);

        try {

            console.log(videoId);
            const response = await api.get(`/videos/${videoId}/edit`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data);
            if (response.data) {
                setVideoData(response.data.video);
                setCourses(response.data.courses);
                setVisibilities(response.data.visibilities);

                
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
    }

    // console.log( formInitialVal );

    const formHandler = async (values) => {
        values.datetime = dateTime;
        values.remark = quillValue;
        console.log(values);
        try {

            console.log(videoId);
            const response = await api.put(`/videos/${videoId}`, values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
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
        
    };




    return (
        <>
            <Button type="primary" size="small" onClick={editHandler}>
                Edit
            </Button>
            {contextHolder}
            <Modal
                title="Edit Video"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                    form.resetFields();
                }}
                footer={null}
                width={500}
            >
                <Form layout="vertical" 
                    initialValues={
                        {
                            course_id : courseId,
                            visibility_id : visibility_id,
                            link : videoLink
                        }
                        
                    }
                    hideRequiredMark onFinish={formHandler} form={form}>
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
                        <Col span={24}>
                            <Form.Item
                                name="visibility_id"
                                label="Visibility"
                                rules={[{ required: true, message: 'Please enter Visibility' }]}
                            >
                                <Select placeholder="Choose Stage" >
                                    {
                                        visibilities.map(function(visibilitie,id){
                                            return  <Select.Option value={visibilitie.id} key={visibilitie.id}>{visibilitie.name}</Select.Option>
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
                            >
                                <DatePicker
                                    showTime
                                    defaultValue={defaultDate}  
                                    // format="YYYY-MM-DD HH:mm:ss" 
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
                        </Col>
                    </Row>
                    <Row gutter={16}>
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
}



export function DeleteRecordVideo({videoId,fetchingData}){
    const [messageApi, contextHolder] = message.useMessage();
    
    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    const [open, setOpen] = useState(false);

    function openDeleteModel (){
        setOpen(true);
    }

    async function yesHandler (){
        try {

            console.log(videoId);
            const response = await api.delete(`/videos/${videoId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    setOpen(false);
                    fetchingData()
                    success(response.data.message);
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
                    <span>Are you sure to delete this video link ?</span>
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