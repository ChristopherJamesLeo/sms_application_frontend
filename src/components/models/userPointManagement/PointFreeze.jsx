import React, { useState } from 'react';
import { Button, Modal , message , ConfigProvider} from 'antd';


export default function PointFreeze(){
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Delete Successful',
        });
    };

    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
    };
    
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        
        setConfirmLoading(true);

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            success();
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
        {contextHolder}

        <ConfigProvider
            theme={{
                token: {
                  colorPrimary: '#52c41a', 
                },
            }}
        >
            <Button type="primary" onClick={showModal}>
                Freeze
            </Button>
        </ConfigProvider>

        <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>Are You sure to delete this User</p>
        </Modal>
        </>
    );
};
