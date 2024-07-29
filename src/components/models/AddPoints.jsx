import React, { useState } from 'react';
import { message , Button, Modal , ConfigProvider } from 'antd';
import UserManualVerification from './UserManualVerification';
import axios from 'axios';
import $ from "jquery";


// start img upload

// end img upload 


const AddPoints = ({userid}) => {
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
                    Point Add
                </Button>
            </ConfigProvider>
            {/* error message */}
                {contextHolder}
            {/* error message */}
            <Modal
                title="Add Point"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={500}
                footer={null}
            >
                <div className='flex justify-between'>
                    <h2></h2>
                    <UserManualVerification userid={userid} />
                </div>
                
            </Modal>
        </>
    );
};
export default AddPoints;