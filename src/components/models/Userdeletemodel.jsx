import React, { useState } from 'react';
import { Button, Modal } from 'antd';
export default function Userdeletemodel(){
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [buttonText, setbuttonText] = useState('Delete');
    
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setbuttonText('Successful Deleted');
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
        <Button type="primary" danger onClick={showModal}>
            {buttonText}
        </Button>
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
