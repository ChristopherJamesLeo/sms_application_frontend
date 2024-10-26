
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import AddCourseService from '../models/AddCourseService';
import UserSearch from "../inputs/UserSearch";
import api from '../api/api';

export default function ServiceLists({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetching data
    const fetchingData = async () => {
        try {


            const response = await api.get('/service/customerservice', {
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
    function updateDate(serviceData){
        console.log(serviceData);
        let showData = serviceData.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            name : item.course.name,
            link : <a href={item.name} className="text-blue-500" target='_blank'>{item.name}</a>,
            servicetype : item.servicetype.name,
            user_id: item.user.name,
            status_id : item.status.name,
            created_at : item.created_at,
            updated_at : item.updated_at,
            
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
            title: 'Course Title',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            width: 150,
        },
        {
            title: 'Type',
            dataIndex: 'servicetype',
            key: 'servicetype',
            width: 150,
        },
        {
            title: 'Admit By',
            dataIndex: 'user_id',
            key: 'user_id',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 150,
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
                <div className='mb-3 flex gap-x-2'>
                    {contextHolder}
                    <AddCourseService/>
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
