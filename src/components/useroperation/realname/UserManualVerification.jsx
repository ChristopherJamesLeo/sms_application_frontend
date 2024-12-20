import React, { useState } from 'react';
import { message , Button, Modal , ConfigProvider , Form , Row , Space , Col , Input , Upload , Image} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import $ from "jquery";
import api from './../../api/api';


// start img upload

// end img upload 


const UserManualVerification = ({ userId,title,size, fetchingData}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


        // Image preview and file handling

        // Image One 
        const [idCardPhoto, setIdCardPhoto] = useState(null);
        const [idCardFile, setIdCardFile] = useState(null);
    
        const beforeIdCardUpload = (file) => {
            // Read the selected file as a data URL for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdCardPhoto(reader.result);
            };
            reader.readAsDataURL(file);
    
            // Store the file for uploading later
            setIdCardFile(file);
    
            // Prevent immediate upload
            return false;
        };

        // Image Two

        const [selfiePhoto, setSelfiePhoto] = useState(null);
        const [selfiePhotoFile, setSelfiePhotoFile] = useState(null);
    
        const beforeSelfiePhotoUpload = (file) => {
            // Read the selected file as a data URL for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelfiePhoto(reader.result);
            };
            reader.readAsDataURL(file);
    
            // Store the file for uploading later
            setSelfiePhotoFile(file);
    
            // Prevent immediate upload
            return false;
        };


    function onReset(){
        form.resetFields();
        setSelfiePhoto(null);
        setSelfiePhotoFile(null);
        setIdCardPhoto(null);
        setIdCardFile(null);
    }

    function buttonHanlder(){
        console.log(userId);
        setOpen(true);
    }

    const formHandler = async (values) => { 
        console.log(values);
        const formData = new FormData();
        formData.append("user_id",userId);
        formData.append('realname', values.realname); 
        formData.append('card_number', values.card_number); 
        formData.append('card_image', idCardFile); 
        formData.append('selfie_image', selfiePhotoFile); 

        try {
            const response = await api.post('/user/userverification', formData , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response) {
                success(response.data.message);
                setOpen(false);
                setSelfiePhoto(null);
                setSelfiePhotoFile(null);
                setIdCardPhoto(null);
                setIdCardFile(null);
                fetchingData();
                form.resetFields();
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
            }
        }


    }



    return (
        <>
            <ConfigProvider >
                <Button type="primary" size={size} onClick={buttonHanlder}>
                    {title}
                </Button>
            </ConfigProvider>
            {/* error message */}
                {contextHolder}
            {/* error message */}
            <Modal
                title="Manual Verification"
                
                open={open}
                onOk={() => setOpen(false)}
                onCancel={()=>{
                    form.resetFields();
                    setSelfiePhoto(null);
                    setSelfiePhotoFile(null);
                    setIdCardPhoto(null);
                    setIdCardFile(null);
                    setOpen(false);

                }}
                width={900}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                    name="realname"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                            
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                    name="card_number"
                                    label="ID Card Number"
                                    rules={[{ required: true, message: 'Please enter ID No' }]}
                            >
                                <Input placeholder="ID Number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="card_image" label="Poster" rules={[{ required: true, message: 'Please enter ID Card Photo' }]}>
                                <Upload
                                    beforeUpload={beforeIdCardUpload}
                                    maxCount={1}
                                    accept="image/png, image/jpeg, image/jpg"
                                    key={Math.random()*100}
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>
                            {idCardPhoto && (
                                <div className="mb-3 py-3 w-100 flex justify-center border-dashed border-2 border-gray-200">
                                    <Image
                                        src={idCardPhoto}
                                        alt="Image preview"
                                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col span={12}>
                            <Form.Item name="selfie_image" label="Poster"  rules={[{ required: true, message: 'Please enter Selfie Photo' }]}>
                                <Upload
                                    beforeUpload={beforeSelfiePhotoUpload}
                                    maxCount={1}
                                    accept="image/png, image/jpeg, image/jpg"
                                    key={Math.random()*100}
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>
                            {selfiePhoto && (
                                <div className="mb-3 py-3 w-100 flex justify-center border-dashed border-2 border-gray-200">
                                    <Image
                                        src={selfiePhoto}
                                        alt="Image preview"
                                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                                    />
                                </div>
                            )}
                        </Col>

                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};


export default UserManualVerification;

export function ViewVerification({title,userId,size,fetchingData}){
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [is_verify,setIsVerify] = useState(null);

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    async function buttonHanlder(){
        setOpen(true);

        try {
            const response = await api.get(`/user/userverification/${userId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                setData(response.data.userdata);
                console.log(response.data.userdata);
                if(response.data.status){
                    setIsVerify(true);
                }else {
                    setIsVerify(false);
                }
                // isVerify();
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

    function isVerify(){

        if(!is_verify){
            return (
                <UserManualVerification userId={userId} title="Edit" size = "small" fetchingData={fetchingData} />
            )
        }else {
            return (
                <Row gutter={12}>
                    <>

                        <Col span={24} className='mb-3'>
                            <div className='bg-gray-100 p-1 mb-2'>Name - { data ? data.realname : null} </div>
                            <div className='bg-gray-100 p-1'>ID Card Number - { data ? data.card_number : null} </div>
                        </Col>
                        <Col span={12}>
                            <Image
                                public_id = { data ? data.card_public_id : null}
                                src={ data ? data.card_image : null}
                                alt="ID card photo"
                            />
                        </Col>
                        <Col span={12}>
                            <Image
                                public_id = { data ? data.selfie_public_id : null}
                                src={ data ? data.selfie_image : null}
                                alt="Selfie photo"
                            />
                        </Col>
                    </>

                </Row>
            )
        }
    }




    return (
        <>
        <ConfigProvider >
            <Button type="primary" size={size} onClick={buttonHanlder}>
                {title}
            </Button>
        </ConfigProvider>
        <Modal
            title="Real Name Info"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={()=>{

                setOpen(false);

            }}
            width={900}
            footer={null}
        >
            {isVerify()}

        </Modal>
    </>
    )
}