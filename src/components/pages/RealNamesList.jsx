
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table  , message , Switch } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import UserSearch from "../inputs/UserSearch";
import api from '../api/api';
import UserManualVerification,{ViewVerification} from '../models/UserManualVerification';

export default function Realnames({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    // start active switch
    const onChange = async (checked, idx) => {
        // console.log(idx);
        let statusId = checked ? 3 : 4; 
        // console.log("status id is", statusId);
        
        let values = {
            id: idx,
            status_id: statusId
        };
        
        try {
            const response = await api.put(`/user/userverification/changestatus/${idx}`, values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                success("Edit successful");
            } else {
                error("Edit failed.");
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
    // end active switch

    // start fetching data
    const fetchingData = async () => {
        try {
            // console.log("hello");

            const response = await api.get('/user/userverification', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
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
    // update data 
    function updateDate(userdata){
        // console.log(videodata);
        let data = userdata;
        let showData = data.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            student_id: item.regnumber,
            realname: item.verification ? item.verification.realname : null ,
            card_number: item.verification ? item.verification.card_number : null ,
            admit_by : item.admit_by ? item.admit_by.name : null ,

            status_id : item.verification ? 
                <Switch 
                defaultChecked={item.verification.status_id === 3} 
                onChange={(checked) => onChange(checked, item.verification.user_id)} />
             : null,
            action : <div className='space-x-3'>
                    <UserManualVerification userId={item.id} title="Edit" size = "small" fetchingData={fetchingData} />
                    <ViewVerification userId={item.id} title="View" size="small" fetchingData={fetchingData}   />
                </div>
        }));
        setLoading(false)
        setfetchData(showData);
    }

    useEffect(()=>{
        fetchingData();
    },[]);

    // console.log(courses);

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
            width: 200,
            dataIndex: 'student_id',
            key: 'student_id',
            fixed: 'left',
        },
        {
            title: 'Real Name',
            width: 250,
            dataIndex: 'realname',
            key: 'realname',
        },{
            title: 'NRC ID',
            width: 250,
            dataIndex: 'card_number',
            key: 'card_number',
        },
        {
            title: 'Admit By',
            dataIndex: 'admit_by',
            key: 'admit_by',
            width: 180,
        },
        {
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 180,
        },
        {
            title: 'Action',
            dataIndex: "action",
            key: 'operation',
            
            fixed: 'right',

        },
    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            <h2 className='table_title'>{title}</h2>
            {contextHolder}
            <div className="my-4">
                <div className='flex gap-x-2'>
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
