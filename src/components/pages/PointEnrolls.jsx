
import React, { useEffect, useState } from 'react';
import {Table, message, Image} from 'antd';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';

import Userlistdrawer from '../drawer/UserDrawer';
import Coursedrawer from '../drawer/Coursedrawer';
import AddEnroll,{EditEnroll} from "../models/AddEnroll";
import UserSearch from "../inputs/UserSearch";
import PointEnrollExport from '../export/PointEnrollExport';


export default function PointEnrolls({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetching data
    const fetchingData = async () => {
        try {
            console.log("hello");

            const response = await api.get('/enroll/points', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                let data = response.data;
                let showData = data.map((item, index) => ({
                    key: item.id,
                    no: index + 1,
                    id: item.id,
                    user_id :  <Userlistdrawer userid = {item.user.id}  name={item.user.name} />,
                    course_id :  <Coursedrawer courseId = {item.course.id} name={item.course.name} />,
                    
                    generate_id : item.transactionId,
                    payment_type : item.paymentType.name,
                    payment_method : item.paymentMethod? item.paymentMethod.name : "Point Pay",
                    stage_id : item.stage.name,
                    status_id : item.status.name,
                    admit_by : item.admitBy.name,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    action : <EditEnroll enrollId = {item.id} fetchAllData = {fetchingData} />
                    
                }));
                setLoading(false)
                setfetchData(showData);
                
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
            title: 'Full Name',
            width: 200,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },
        {
            title: 'Course',
            width: 250,
            dataIndex: 'course_id',
            key: 'course_id',
        },
        {
            title: 'Transaction Id',
            dataIndex: 'generate_id',
            key: 'generate_id',
            width: 150,
        },
        {
            title: 'Payment Type',
            dataIndex: 'payment_type',
            key: 'payment_type',
            width: 180,
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            key: 'payment_method',
            width: 150,
        },{
            title: 'Stage',
            dataIndex: 'stage_id',
            key: 'stage_id',
            width: 150,
        },{
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Admit By',
            dataIndex: 'admit_by',
            key: 'admit_by',
            width: 150,
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
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 200,
        },
    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            {contextHolder}
            <h2 className='table_title'>{title}</h2>
            <div className="my-4">
                <div className='mb-3 flex gap-x-2'>
                    <AddEnroll fetchData = {fetchingData}/>
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                    <PointEnrollExport/>
                </div>
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
