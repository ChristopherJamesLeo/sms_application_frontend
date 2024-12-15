import React, { useState } from 'react';
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , Image , ConfigProvider} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Userlistdrawer from '../drawer/UserDrawer';
import Coursedrawer from '../drawer/Coursedrawer';
import api from '../api/api';

const AddPackageOrder = ({fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    var [userId,setUserId] = useState(null);
    var [packageLists,setPackageLists] = useState([]);
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
            const response = await api.get(`/packageorders/create` , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            
            if(response){
                // console.log(response.data.userdata);
                let formdata = response.data;
                
                // console.log(formdata.packages);
                // console.log(formdata.paymentMethods);
                // console.log(formdata.paymentTypes);
                setPackageLists(formdata.packages);
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
                setUserData(userdata);
                // couserselect(response.data.courses)
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

    // end verify reg number 

    // start form reset
    const onReset = () => {
        form.resetFields();
        setPreviewUrl(null); // Clear the preview image
        setPaymentType([]);
        setPackageLists([]);
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
        formData.append("package_id",values.package_id);
        formData.append("payment_type_id",values.payment_type_id);
        formData.append("payment_method_id",values.payment_method_id ? values.payment_method_id : null);
        formData.append("description",values.description);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        console.log(values);
        try {
            console.log(values);

            const response = await api.post('/packageorders', formData, {
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
                    // fetchData();
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
                Add Order
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
                    setPackageLists([]);
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
                                name="package_id"
                                label="Package Name"
                                rules={[{ required: true, message: 'Please enter email' }]}
                            >
                                <Select placeholder="Choose Package" >
                                    {
                                        packageLists.map(function(packageList,idx){
                                            return <Option key={packageList.id} value={packageList.id}>{packageList.name}</Option>
                                        })   
                                    } 
                                </Select>
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
                                                <Option key={Math.floor(Math.random()*100)} value={paymentType.id}>{paymentType.name}</Option>
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
                                name="description"
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

export default AddPackageOrder;

