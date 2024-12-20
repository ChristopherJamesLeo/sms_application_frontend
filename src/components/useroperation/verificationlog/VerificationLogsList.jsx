
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Badge , Tag} from 'antd';
import api from '../../api/api';
import axios, { Axios } from 'axios';
import "./../../CustomCss/tablestyle.css";

import Userlistdrawer from '../../userManagement/user/UserDrawer';
import UserSearch from "../../inputs/UserSearch";

export default function Verificationlogs({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [courses,setCourses] = useState([]);
    const [stages,setStages] = useState([]);


    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetching data
    const fetchingData = async () => {
        try {


            const response = await api.get('/otps', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                updateDate(response.data);
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

    //  
    function updateDate(otpData){
        console.log(otpData);
        let showData = otpData.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            user_id : item.user.regnumber,
            otp : item.otp,
            email : item.user.email,
            ipaddress: item.deviceIp,
            status_id : item.status ? <Tag color='default'>{item.status.name}</Tag>  : null,
            expire_at : item.expired_at,
            created_at : item.created_at,
            
        }));
        console.log(showData);
        setLoading(false)
        setfetchData(showData);
    }
    // 

    useEffect(() => {
        fetchingData();
    }, []);

    const columns = [
        {
            title: 'No',
            width: 60,
            dataIndex: 'no',
            key: 'no',
            fixed: 'left',
        },
        {
            title: 'Student Id',
            width: 150,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },
        {
            title: 'OTP Code',
            width: 100,
            dataIndex: 'otp',
            key: 'otp',
        }, {
            title: 'Email',
            width: 300,
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'IP Address',
            width: 250,
            dataIndex: 'ipaddress',
            key: 'ipaddress',
        },{
            title: 'Status',
            width: 250,
            dataIndex: 'status_id',
            key: 'status_id',
        },
        {
            title: 'Expire at',
            width: 250,
            dataIndex: 'expire_at',
            key: 'expire_at',
        },{
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
        }, 

    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            <h2 className='table_title'>{title}</h2>
            <div className="my-4 ">
                <div className='flex gap-x-2'>
                </div>
                <div className='flex justify-end'>
                    {contextHolder}
                    <UserSearch/>
                </div>
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 15 }}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
