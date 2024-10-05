import React, { useState } from 'react';
import { Modal , message } from 'antd';
import {EditOutlined} from '@ant-design/icons';

export default function UserNote(){
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [buttonText, setbuttonText] = useState('Note');

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Disable Successful',
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
            setbuttonText('Successful Disable');
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
        <EditOutlined onClick={showModal}/>
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
