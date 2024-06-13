import React, { useState } from 'react';
import { Button, Modal , Select , message } from 'antd';
export default function Userpromotemodel(){
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [value , setValue] = useState("");
    const [buttonText, setbuttonText] = useState('Promote');

    const [messageApi, contextHolder] = message.useMessage();

    // select box option
    function selectHandler(value){
        setValue(value);
    }

    // start message 
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Promote Successful',
        });
    };

    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
    };
    // end message
    
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setbuttonText(`Promoted to ${value}`);
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
            <Button type="primary" onClick={showModal}>
                {buttonText}
            </Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {contextHolder}
                <h2>User Name</h2>
                <Select
                    showSearch
                    style={{
                    width: "100%",
                    }}
                    onChange={selectHandler}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    options={[
                        {
                            value: '1',
                            label: 'Not Identified',
                        },
                        {
                            value: '2',
                            label: 'Closed',
                        },
                        {
                            value: '3',
                            label: 'Communicated',
                        },
                        {
                            value: '4',
                            label: 'Identified',
                        },
                        {
                            value: '5',
                            label: 'Resolved',
                        },
                        {
                            value: '6',
                            label: 'Cancelled',
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
