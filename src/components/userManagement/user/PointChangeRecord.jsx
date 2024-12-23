import React, { useEffect, useState } from 'react';
import { Table, message , Button, Modal , ConfigProvider } from 'antd';
import Userlistdrawer from './UserDrawer';
import api from '../../api/api';
// import UserManualVerification from './UserManualVerification';
import axios from 'axios';
import $ from "jquery";


// start img upload

// end img upload 


const PointChangeRecord = ({userid}) => {
    console.log(userid);
    let [data,setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();


    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    // start fetching data
    const fetchingData = async (userid) => {
        console.log(userid);
        try {
            console.log(userid);
            console.log("hello");

            const response = await api.get(`/pointtransfers/${userid}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)

                console.log(data);
                let showData = response.data.map((item, index) => ({

                    key: index,
                    no: index + 1,
                    id: item.id,
                    sender :  <Userlistdrawer userid = {item.sender.id}  name={item.sender.name} /> ,
                    receiver :  <Userlistdrawer userid = {item.receiver.id}  name={item.receiver.name} />,
                    generate_id : item.generate_id,
                    before :  item.before,
                    amount :  item.amount,
                    after :  item.after,
                    stage : item.stage.name,
                    datetime : item.created_at,
                    remark : item.description,
                }));
                console.log(showData);
                setLoading(false)
                setData(showData);

            } else {
                error("Data fetching failed.");
            }
        } catch (err) {
            if (err.response) {
                error(err.response.status === 404 ? "Resource not found (404)." : `Error: ${err.response.status}`);
            } else if (err.request) {
                error("No response received from server.");
            } else {
                error("Error in setting up request.");
            }
        } finally {
            setLoading(false);
        }
    };

    // end fetching Data

    const columns = [
        {
            title: 'No',
            width: 60,
            dataIndex: 'no',
            key: 'no',
            fixed: 'left',
        },
        {
            title: 'Sender',
            width: 150,
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            title: 'Receiver',
            width: 150,
            dataIndex: 'receiver',
            key: 'receiver',
        },{
            title: 'Transaction Id',
            width: 200,
            dataIndex: 'generate_id',
            key: 'generate_id',
        },{
            title: 'Before Amount',
            width: 150,
            dataIndex: 'before',
            key: 'before',
        },{
            title: 'Transaction Amount',
            width: 200,
            dataIndex: 'amount',
            key: 'amount',
        },{
            title: 'After Amount',
            width: 150,
            dataIndex: 'after',
            key: 'after',
        },{
            title: 'Transaction Type',
            width: 150,
            dataIndex: 'stage',
            key: 'stage',
        },{
            title: 'Date and Time',
            dataIndex: 'datetime',
            key: 'datetime',
            width: 250,
        },{
            title: 'Remark',
            width: 300,
            dataIndex: 'remark',
            key: 'remark',
        },


    ];


    // end submit btn

    let tableWidth = 0 ;

    columns.forEach(function(column){
        tableWidth += column.width;
    })

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1677ff',
                    },
                }}
            >
                <Button type="primary" onClick={() => {
                    setOpen(true);
                    fetchingData(userid);
                }}>
                     Point Change Record
                </Button>
            </ConfigProvider>
            {/* error message */}
            {contextHolder}
            {/* error message */}
            <Modal
                title="Point Change Record"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1500}
                footer={null}
            >
                <Table
                    dataSource={data}
                    columns={columns}
                    loading={isLoading}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: {tableWidth} , y : "68vh" }}
                />

            </Modal>
        </>
    );
};
export default PointChangeRecord;