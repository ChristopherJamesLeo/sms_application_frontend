
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table  , message } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import AddStatus , {EditStatus} from '../models/SettingModels/Status';

import Userlistdrawer from '../drawer/UserDrawer';
import UserSearch from "../inputs/UserSearch";
import api from '../api/api';

export default function Statues({title}){
    var [fetchData, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    const fetchingData = async () => {
        try {
            const response = await api.get('/statuses', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });

            if (response.data && response.data.data) {
                let data = response.data.data;
                let showData = data.map((item, index) => ({
                    key: item.id,
                    no: index + 1,
                    id: item.id,
                    name: item.name,
                    user_id: item.user.name,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    action: <EditStatus idx={item.id} name={item.name} fetchData={fetchingData} />
                }));
                // console.log(showData);

                setfetchData(showData);
                setLoading(false);
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

    // console.log(fetchData);
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
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Admit By',
            width: 250,
            dataIndex: 'user_id',
            key: 'user_id',
        },{
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
        },{
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 180,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 150,
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
            <div className="my-4 ">
                <div className='flex gap-x-2 mb-2'>
                    <AddStatus userData ={setfetchData} fetchData={fetchingData} />
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            <Table
                dataSource={fetchData}
                columns={columns}
                loading={isLoading}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "84vh" }}
            />
        </div>
    );
};
