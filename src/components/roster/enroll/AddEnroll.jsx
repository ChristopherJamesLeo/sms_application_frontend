import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , Image , ConfigProvider} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Userlistdrawer from '../../userManagement/user/UserDrawer';
import Coursedrawer from '../../courses/Coursedrawer';
import api from '../../api/api';

const AddEnroll = ({fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    var [userId,setUserId] = useState(null);
    var [courses,setCourses] = useState([]);
    var [paymentMethods,setPaymentMethods] = useState([]);
    var [paymentTypes,setPaymentTypes] = useState([]);


    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

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

    // start open model
    async function modelHandler(){
        setOpen(true);
        try {
            const response = await api.get(`/enrolls/create` , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            
            if(response){
                // console.log(response.data.userdata);
                let formdata = response.data;
                
                console.log(formdata);
                // setCourses(formdata.courses);
                setPaymentMethods(formdata.paymentMethods);
                setPaymentTypes(formdata.paymentTypes);
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

    // end open model


    // start payment type
    const [paymentType, setPaymentType] = useState(false);

    function paymentHandle(value){
        setPaymentType(value);

    }

    function paymentTypeRender(value){
        if(value == "1" || value == "2"){
            return (
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="image"
                            label="User Image"
                            rules={[{ required: true, message: 'Please Enter Receipt' }]}
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
            ) 
            
        } else if(value == "2"){
            return (
                <div className='mb-3'>
                    
                </div>
            );
        } else {
            return false;
        }
    }
    // end payment type

    // start payment method
    function showPaymentMethod(value){
        if(value == "1" || value == "2"){
            return (
                <Col span={24}>
                    <Form.Item
                        name="payment_method_id"
                        label="Payment Method"
                        rules={[{ required: true, message: 'Please Payment Method' }]}
                    >
                        <Select placeholder="Choose Payment Method">
                            {
                                paymentMethods.map(function(paymentMethod,dix){
                                    // console.log(method);
                                    return(
                                        <Option value={`${paymentMethod.id}`}>{paymentMethod.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
            ) 
            
        } else {
            return false;
        }
    }

    // end payment method

    // start verify reg number
    let [userdata, setUserData] = useState({});

    async function userRegHangler(value){
        // console.log(value.target.value);
        var getRegId = value.target.value;
        // console.log(getRegId);
        try {
            const response = await api.get(`/enrolls/checkuser/${getRegId}` , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            
            if(response){
                console.log(response.data.userdata);
                let userdata = response.data.userdata;
                setUserId(userdata.id);
                setCourses(response.data.courses);
                setUserData(userdata);
                couserselect(response.data.courses)
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
    
    function showUserInfo(value){
        
        if(value != null){
           
            return (
                <>
                    <div className='mb-3 '> 
                        <div className='bg-gray-100 p-1'> Name - {value.name}  </div> 
                        <div  className='p-1'>Student Id - {value.regnumber}</div> 
                        <div  className='bg-gray-100 p-1'>Role - {value.role ? value.role.name : null}</div>
                    </div>
                </>
            )
        }else {
            return false;;
        }
        
    }

    function couserselect(values){
       
        return (
            <Select placeholder="Choose Class" >
                {
                    !values ? false : values.map(function(course){
                        return (
                            <Option key={course.id} value={`${course.id}`}>{course.name}</Option>
                        )
                    })
                } 
            </Select>
        )

    }
    // end verify reg number 

    // start form reset
    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
        setPaymentType([]);
        setCourses([]);
        setUserData({})
        setSelectedFile(null);
    };

    // end form reset

    // start form submit
    const formHandler = async (values) => {
        
        values.user_id = userId;
        values.role_id = userdata.role.id;
        const formData = new FormData();
        formData.append("user_id",userId);
        formData.append("role_id",userdata.role.id);
        formData.append("regId",values.regId);
        formData.append("course_id",values.course_id);
        formData.append("payment_type_id",values.payment_type_id);
        formData.append("payment_method_id",values.payment_method_id ? values.payment_method_id : null);
        formData.append("remark",values.remark);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        console.log(values);
        try {
            console.log(values);

            const response = await api.post('/enrolls', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}` ,
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.data) {
                console.log(response.data);
                
                if(response.data.status == "fail"){
                    error(response.data.message);
                    return false;
                }else {
                    success(response.data.message);
                    console.log(response.data.message);
                    onReset();
                    setOpen(false);
                    fetchData();
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
    // end form submit


    return (
        <>
            <Button type="primary" onClick={modelHandler}>
                Add Enroll
            </Button>
            {contextHolder}
            <Modal
                title="Add Enroll"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => { 
                    setOpen(false)
                    form.resetFields();
                    setPreviewUrl(null);
                    setPaymentType([]);
                    setUserId(null);
                    setCourses([]);
                    setUserData({});
                }}
                footer={null}
                width={500}
            >
                {showUserInfo(userdata)}
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="regId"
                                label="Student Id"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" onBlur={userRegHangler}/>
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
                                name="payment_type_id"
                                label="Payment Type"
                                rules={[{ required: true, message: 'Please Payment Type' }]}
                            >
                                <Select placeholder="Choose Payment Type" onChange={paymentHandle}>
                                {
                                        paymentTypes.map(function(paymentType,idx){
                                            return(
                                                <Option value={paymentType.id}>{paymentType.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        {showPaymentMethod(paymentType)}
                        
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="remark"
                                label="Description"
                                rules={[{ required: true, message: 'Please enter description' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Please enter description" />
                            </Form.Item>
                        </Col>
                    </Row>
                    {paymentTypeRender(paymentType)}
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

export default AddEnroll;


export function EditEnroll ({enrollId,fetchAllData}) {
    console.log(enrollId);
    const [form] = Form.useForm();
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetch single Data 
    async function fetchingData(id){
        let enrollId = id;
        try {
            // console.log(enrollId);
            const response = await api.get(`/enrolls/${enrollId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            // console.log(response)
            if (response.data) {
                
                console.log(response.data)
                let data = response.data;
                setData(data);
                
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
            // setloading(false);
        }
    }
    // end fetch single data

    function modalHandler(){
        setOpen(true)
        fetchingData(enrollId)
    }

    

    // start data
    let [dateTime,setDateTime] = useState(null);
    const onOk = (value,dateString) => {
        // console.log('onOk: ', dateString);
        setDateTime(dateString);
    };
    // end date

    const onReset = () => {
        form.resetFields();
        // setPreviewUrl(null);
    };

    function formHandler(values){
        console.log(values);

    }
  return (
    <>
        <Button type="primary" size='small' style={
            {
                borderRadius : "0px",
                backgroundColor : "yellowgreen"
            }
        } onClick={modalHandler}>
            View
        </Button>
        {contextHolder}
        <Modal
            title="Verify Enroll"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => {
                setOpen(false);
                form.resetFields();
                // setPreviewUrl(null);
            }}
            footer={null}
            width={1000}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Image
                            width={"100%"}
                            height={"100%"}
                            style={
                                {
                                    objectFit: "cover"
                                }
                            }
                            public_id = {`${data.public_id}`}
                            src={`${data.image}`}
                            fallback="data:image/png;base64,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"
                    />
                </Col>
                <Col span={12}>
                    <ul className='list_container'>
                        <li><span>Student Name : </span>  <Userlistdrawer name={data.user ? data.user.name : false} userid = {data.user ? data.user.id : false} /></li>
                        <li><span>Student ID : </span>{data.user ? data.user.regnumber : null}</li>
                        <li><span>Course Title : </span><Coursedrawer courseId = {data.course ? data.course.id : false } name={data.course ? data.course.name : false} /></li>
                        <li><span>Transaction : </span>{data.transactionId ? data.transactionId : null}</li>
                        <li><span>Payment Method : </span>{data.paymentMethod ? data.paymentMethod.name : 'Point Pay'}</li>
                        <li><span>Payment Type : </span>{data.paymentType ? data.paymentType.name : null}</li>
                        <hr className='my-5'/>
                        <li>Stage : {data.stage ? data.stage.name : null}</li>
                        <li>Register at : {data.created_at ? data.created_at : null}</li>
                        <li>Verify By : {data.admitBy ? data.admitBy.name : null}</li>
                        <li>Verified at : {data.updated_at ? data.updated_at : null}</li>
                        <hr className='my-5'/>
                        <span>Remark</span>
                        <li>{data.remark ? data.remark : null}</li>
                    </ul>
                </Col>
                <Col span={24} className='flex justify-end'>
                    <VerifyButton EnrollId={data.id} stageId = {data.stage ? data.stage.id : false} fetchData = {fetchingData} fetchAll = {fetchAllData}/>
                </Col>
            </Row>
        </Modal>
    </>
  );
};



export function VerifyButton({ EnrollId , stageId , fetchData , fetchAll}) {
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
            const response = await api.get(`/enroll/stages`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                // console.log(response.data.data);
                setStages(response.data.data);
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
        values.id = EnrollId;

        
        try {
            // console.log(EnrollId);
            // console.log(values);
            const response = await api.put(`/enrolls/${EnrollId}`, values , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                // console.log(response.data);
                form.resetFields();
                setOpen(false);
                success("Data Update Successful");
                fetchData(EnrollId);
                fetchAll();
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
                <Button type="primary" className='mt-5' onClick={modelHandler}>Verify</Button>
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
};