import React, { useEffect, useState } from 'react';
import { Table, message , Button, Modal , ConfigProvider } from 'antd';
import Coursedrawer from '../../courses/Coursedrawer';
import api from '../../api/api';
// import UserManualVerification from './UserManualVerification';
import axios from 'axios';
import $ from "jquery";


// start img upload

// end img upload 


const AttendedRecord = ({userid}) => {
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

            const response = await api.get(`/users/attendantrecords/${userid}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                let data = response.data.data;
                console.log(data);
                let showData = data.map((item, index) => ({
                    
                    key: index,
                    no: index + 1,
                    id: item.id,
                    attendant_code : item.code,
                    course_id :  <Coursedrawer key={index} courseId = {item.courseId} name={item.course} />,
                    date : item.date,
                   
                    admit_by : item.admit_by,
                    created_at : item.created_at,
                    updated_at : item.updated_at,
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
            title: 'Attendant Code',
            width: 130,
            dataIndex: 'attendant_code',
            key: 'attendant_code',
        },
        {
            title: 'Course',
            width: 250,
            dataIndex: 'course_id',
            key: 'course_id',
        },
        {
            title: 'Date and Time',
            dataIndex: 'date',
            key: 'date',
            width: 180,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
        },{
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 200,
        }

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
                Attended Record
            </Button>
        </ConfigProvider>
        {/* error message */}
            {contextHolder}
        {/* error message */}
        <Modal
            title="Attended Record"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1300}
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
export default AttendedRecord;