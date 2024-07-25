import React, { useState } from 'react';
import { message , Button, Modal , ConfigProvider } from 'antd';
import UserManualVerification from './UserManualVerification';
import axios from 'axios';
import $ from "jquery";


// start img upload

// end img upload 


const LeaveRecord = ({userid}) => {
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
        <ConfigProvider 
            theme={{
                token: {
                  colorPrimary: '#1677ff', 
                },
            }}
        >
            <Button type="primary" onClick={() => setOpen(true)}>
                Leave Record
            </Button>
        </ConfigProvider>
        {/* error message */}
            {contextHolder}
        {/* error message */}
        <Modal
            title="User Verification"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <div className='flex justify-between'>
                <h2>Leave Records</h2>
                <UserManualVerification userid={userid} />
            </div>
            
        </Modal>
        </>
    );
};
export default LeaveRecord;