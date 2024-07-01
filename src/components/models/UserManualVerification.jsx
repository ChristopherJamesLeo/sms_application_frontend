import React, { useState } from 'react';
import { message , Button, Modal , ConfigProvider } from 'antd';
import axios from 'axios';
import $ from "jquery";


// start img upload

// end img upload 


const UserManualVerification = ({userid}) => {
    const [open, setOpen] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'User Add Successful',
        });
    };
    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'User Add Fail',
        })
    };


    // end submit btn


    return (
        <>
        <ConfigProvider >
            <Button type="primary" onClick={() => setOpen(true)}>
                User Manual Verification
            </Button>
        </ConfigProvider>
        {/* error message */}
            {contextHolder}
        {/* error message */}
        <Modal
            title="User Manual Verification"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={700}
            footer={null}
        >
            <h2>Manual Verification</h2>
        </Modal>
        </>
    );
};


export default UserManualVerification;