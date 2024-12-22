import React,{useState} from "react";
import { Button, Modal, Col, Form, Input, Row, Upload, Space, message , Select , Image , ConfigProvider} from 'antd';
import api from '../../api/api';

const View = () => {
    let [open,setOpen] = useState(false);

    const openModalHandler = () => {
        setOpen(true);
    };
     
    return (
        <>
            <ConfigProvider>
                <Button type="primary" size="small" onClick={openModalHandler}>
                    View
                </Button>
                </ConfigProvider>
                <Modal         
                    title="Add Point orders"
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
                        <Col span={12}>
                            How Are You
                        </Col>
                    </Row>
                </Modal>
            
            
        </>
    )
}

export default View;