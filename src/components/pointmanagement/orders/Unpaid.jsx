import React,{useState} from "react";
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , Image , ConfigProvider} from 'antd';
import api from '../../api/api';

const Unpaid= () => {
    let [open,setOpen] = useState(false);

    const openModalHandler = () => {
        setOpen(true);
    };
     
    return (
        <>
            <ConfigProvider theme={
                {
                    token : {
                        colorPrimary: "red",
                    }
                }
            }>
                <Button type="primary" size="small" onClick={openModalHandler}>
                    Unpaid
                </Button>
            </ConfigProvider>
                <Modal         
                    title="Unpaid"
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => { 
                        setOpen(false)
                       
                    }}
                    footer={null}
                    width={1000}>
                    <Row gutter={16}>
                        <Form>

                        </Form>
                    </Row>

                </Modal>
           
            
        </>
    )
}

export default Unpaid;