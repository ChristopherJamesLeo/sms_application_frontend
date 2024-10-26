
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';

import AddPoint,{EditPoint} from '../models/AddPoint';
import UserSearch from "../inputs/UserSearch";

export default function PointChangeRecord({title}){
    const [data, setfetchData] = useState([]);
    const [currentpoint, setCurrentPoint] = useState(null);
    const [totalpoint, setTotalPoint] = useState(null);
    const [usingpoint, setUsingPoint] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

        // start fetching data
        const fetchingData = async () => {
            try {
                console.log("hi")
                const response = await api.get('/points', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
                });
                console.log(response.data)
                if (response.data) {
                    console.log(response.data)
                    let showData = response.data.pointchange.map((item, index) => ({
                        key: item.id,
                        no: index + 1,
                        id: item.id,
                        point: item.points,
                        admit_by: item.user.name,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        action : <EditPoint idx = {item.id} point = {item.points} fetchData = {fetchingData}  />
                        
                    }));
                    setTotalPoint(response.data.totalpoint);
                    setCurrentPoint(response.data.currentpoint);
                    setUsingPoint(response.data.usingpoint);
    
                    setfetchData(showData);
                    setLoading(false)
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
            title: 'Point',
            width: 200,
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Admit By',
            width: 250,
            dataIndex: 'admit_by',
            key: 'admit_by',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
        },
        {
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
        }
    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            {contextHolder}
            <h2 className='table_title'>{title}</h2>
            <div className="my-4 ">
                <div className='mb-3 flex gap-x-2'>
                    <AddPoint fetchdata = {fetchingData} />
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            <div className='mb-4 flex justify-between gap-x-5'>
                <div className=' flex-1 p-5 rounded text-center bg-blue-100'>
                    <h3 className='text-lg mb-2'>Total Point</h3>
                    <span className='text-xl'>{totalpoint}</span>
                </div>
                <div className=' flex-1 p-5 rounded text-center bg-green-100'>
                    <h3 className='text-lg mb-2'>Current Point</h3>
                    <span className='text-xl'>{currentpoint}</span>
                </div>
                <div className=' flex-1 p-5 rounded text-center bg-pink-100'>
                    <h3 className='text-lg mb-2'>Using Point</h3>
                    <span className='text-xl'>{usingpoint}</span>
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
