import React,{useState} from "react";
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , Image , ConfigProvider} from 'antd';
import api from '../../api/api';

const Paid= () => {
    let [open,setOpen] = useState(false);

    const openModalHandler = () => {
        setOpen(true);
    };
     
    return (
        <>
            <ConfigProvider theme={
                {
                    token : {
                        colorPrimary: "orange",
                    }
                }
            }>
                <Button type="primary" size="small" onClick={openModalHandler}>
                    Paid
                </Button>
            </ConfigProvider>
                <Modal         
                    title="Paid"
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => { 
                        setOpen(false)
                       
                    }}
                    footer={null}
                    width={1000}>
                    <Row gutter={16}>
                        <Col span={12}> 
                            <Image width={"100%"} src="https://via.placeholder.com/100" />
                        </Col>
                       
                    </Row>
                </Modal>
           
            
        </>
    )
}

export default Paid;