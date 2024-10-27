

import React, { useState } from 'react';
import { Button, Modal , Col, DatePicker, Form, Input, Row, Select, Space , message , Upload , Image , ConfigProvider} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/api';
import $, { ready } from "jquery";
const AddLeave = ({fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start verify reg number
    let [userId, setUserId] = useState(null);
    let [userdata, setUserData] = useState({});
    let [courses, setCourses] = useState([]);

    async function userRegHangler(value){
        // console.log("hello");
        // console.log(value.target.value);
        var getRegId = value.target.value;
        // console.log(getRegId);
        try {
            // console.log(getRegId)
            const response = await api.get(`/leave/checkuser/${getRegId}` , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            
            if(response){
                console.log(response.data);
                // console.log(response.data.userdata);
                let userdata = response.data.userdata;
                // console.log(userdata);
                if(response.data.status == "fail"){
                    return false;
                }
                setUserId(userdata.id);
                setUserData(userdata);
                setCourses(response.data.userenrolls)
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

    // let [regNumber , setRegNumber] = useState(null);

    
    function showUserInfo(value){
        
        if(value != null){
           
            return (
                <>
                    <div className='mb-3'> <span> Name - {value.name}  </span> & <span>Student Id - {value.regnumber}</span> </div>
                </>
            )
        }else {
            return false;;
        }
        
    }

    // console.log(courses);
    function couserselect(values){
        return (
            <Select placeholder="Choose Class" >
                {
                    values.map(function(course){
                        return (
                            <Option key={course.id} value={`${course.id}`}>{course.name}</Option>
                        )
                    })
                } 
            </Select>
        )

    }
    // end verify reg number 

    // start image preview
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const beforeUpload = (file) => {
        // Read the selected file as a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        setSelectedFile(file);

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
        setPreviewUrl(null);
    };

    async function formHandler(values){
        values.datetime = dateTime;
        values.user_id = userId;

        const formData = new FormData();
        formData.append("user_id",userId);
        formData.append("datetime",dateTime);
        formData.append("course_id",values.course_id);
        formData.append("remark",values.remark);

        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {

            const response = await api.post('/leaves', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}` ,
                    "Content-Type": "multipart/form-data",
                }
            });
            if (response.data) {
                console.log(response.data);
                console.log(response.data.message);
                success(response.data.message);
                
                onReset();
                setUserData({});
                setCourses([]);
                setOpen(false);
                
                fetchData();
                
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
  return (
    <>
        <Button type="primary" onClick={()=> setOpen(true) }>
            Add Leave
        </Button>
        {contextHolder}
        <Modal
            title="Add Leave"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => {
                setOpen(false);
                form.resetFields();
                setPreviewUrl(null);
                setUserData({});
                setCourses([]);
            }}
            footer={null}
            width={800}
        >
            {showUserInfo(userdata)}
             <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="regnumber"
                                    label="Student Id"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Student ID',
                                    },
                                    ]}
                                >
                                    <Input placeholder="Please enter user name" onBlur={userRegHangler} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="course_id"
                                    label="Course"
                                    rules={[{ required: true, message: 'Please enter email' }]}
                                >
                                    {couserselect(courses)}
                                </Form.Item>
                            </Col>
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
                                <Form.Item
                                    name="remark"
                                    label="Remark"
                                    rules={[{ required: true, message: 'Please enter Remark' }]}
                                >
                                    <Input.TextArea rows={4} placeholder="Please enter Remark" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                                
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="image"
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
export default AddLeave;

export function VerifyButton({leaveId,stageId,fetchData}){

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const [stages, setStages] = useState([]);



    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    // start model data
    async function modelHandler(){
        setOpen(true)
        try {
            const response = await api.get(`/leave/stages`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                // console.log(response.data.data);
                setStages(response.data);
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
    // end modal data

    const formHandler = async (values) => {
        // console.log(values);
        // values.id = ;

        try {
            // console.log(leaveId);
            // console.log(values);

            const response = await api.put(`/leaves/${leaveId}`, values , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                // console.log(response.data);
                form.resetFields();
                setOpen(false);
                success(response.data.message);
                fetchData();
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

    if(!stages){
        return false;
    }


    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button  type="primary" onClick={modelHandler} size='small'>Verify</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Verify Enroll"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark
                    onFinish={formHandler}
                    form={form}
                    initialValues={{ stage_id : stageId }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="stage_id"
                                label="Stage"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please choose stage',
                                },
                                ]}
                            >
                                <Select placeholder="Please choose the stage">
                                    {
                                        stages.map(function(stage,id){
                                            // console.log(stage);
                                            return(
                                                <Option key={stage.id} value={stage.id}>{stage.name}</Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Button type="primary" htmlType="button" onClick={formConfirm}>Submit</Button>
                        <Button htmlType="button" onClick={onReset}>Reset</Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}

