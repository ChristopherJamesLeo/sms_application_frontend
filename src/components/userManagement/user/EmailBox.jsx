import React,{useState,useEffect} from "react";

import { Modal, Button, Row, Col , Input , Form , message  } from "antd";

import api from "../../api/api";
 

export default function EmailBox({userid }){

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm(); 

    async function modelHandler(){
        setOpen(true);


        try{
            console.log('hello');
            const response = await api.get(`/users/${userid}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                console.log(response.data);
                const data = response.data;
                console.log(data);
                
            } else {
                error("Edit failed.");
            }
        }catch(err){
            console.log(err)
        }

    }





    return (
        <>
            <Button type="primary" onClick={modelHandler}>Send Email</Button>

            <Modal title="Email Send Box" 
                open={open} 
                onOk={()=>setOpen(false)} 
                onCancel={
                    ()=>{
                        setOpen(false);
                        form.resetFields();
                    }
                } 
                
                footer={null}
                width={700}>
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name="Title" 
                        label="Title"
                        rules = {[{required: true, message: "Please enter the title"}]}>
                        
                        <Input placeholder="Subject" />
                    </Form.Item>
                    <Form.Item 
                    name="message"
                    label="Message"
                    rules={[{required: true, message: "Please enter the message"}]}>
                        <Input.TextArea style={
                            {height: "200px"}
                        } placeholder="Message" />
                    </Form.Item>
                    <Form.Item >
                        <Row gutter={16} className="space-x-2 justify-end">
                            <Button type="primary">Send</Button>
                            <Button >Cancel</Button>
                        </Row>
                        
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}


