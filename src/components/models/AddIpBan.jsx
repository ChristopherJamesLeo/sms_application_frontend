import React, { useState } from 'react';
import { Button, Modal , Col, ConfigProvider, Form, Input, Row, Popconfirm, Space , message } from 'antd';
import api from '../api/api';


const text = 'Are You Sure To Add This IP Address To Ban List ?';
const description = 'Click "YES" button';

export default function AddIpBan ({fetchingData})  {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // end submit btn

    const onReset = () => {
        form.resetFields();
    };

    function formConfirm (){
        form.submit();
        
    }
    let formHandler= async (values) => {
        console.log(values);
        try {
            const response = await api.post('/ipbanlists', values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                setOpen(false);
                form.resetFields();
                fetchingData()
                success(response.data.message);
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
            <ConfigProvider 
                theme={{
                    token: {
                    colorPrimary: '#1677ff', 
                    },
                }}
            >
                <Button type="primary" onClick={() => setOpen(true)}>
                    Add IP Address
                </Button>
            </ConfigProvider>
            {/* error message */}
                {contextHolder}
            {/* error message */}
            <Modal
                title="Add IP Address"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="ip"
                            label="IP Address"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Amount',
                            },
                            ]}
                        >
                            <Input placeholder="Please enter IP Address" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="remark"
                            label="Remark"
                            rules={[
                            {
                                required: true,
                                message: 'Please Enter Remark',
                            },
                            ]}
                        >
                             <Input.TextArea rows={4} placeholder="Please enter remark" />
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Space>
                    <Popconfirm
                        placement="bottomLeft"
                        title={text}
                        description={description}
                        okText="Yes"
                        cancelText="No"
                        okType='primary'
                        onConfirm={formConfirm}
                    >
                        <Button type="primary" htmlType="button">
                            Submit
                        </Button>
                    </Popconfirm>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            
            </Form>
                
            </Modal>
        </>
    );
};


export function DeletIpBan({ipId,fetchingData}){
    const [messageApi, contextHolder] = message.useMessage();
    
    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    const [open, setOpen] = useState(false);

    function openDeleteModel (){
        setOpen(true);
    }

    async function yesHandler (){
        try {

            const response = await api.delete(`/ipbanlists/${ipId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    success(response.data.message);
                    setOpen(false);
                    fetchingData()
                    
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
                    <span>Are you sure to delete this IP Address ?</span>
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