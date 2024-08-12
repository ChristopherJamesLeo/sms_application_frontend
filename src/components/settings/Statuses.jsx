
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import AddStatus , {EditStatus} from '../models/SettingModels/Status';

import Userlistdrawer from '../drawer/UserDrawer';
import UserSearch from "../inputs/UserSearch";
import api from '../api/api';

export default function Statues({title}){
    const [fetchData, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    function fetchingData(){
        api.get('/statuses',{
            headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
        }).then((response)=>response.data).then((data)=>{
            // console.log(data);
            let showData = data.data.map((item, index) => ({
                key: item.id,
                no: index + 1,
                id: item.id,
                name: item.name,
                user_id: item.user.name,
                created_at: item.created_at,
                updated_at: item.updated_at,
                action: <EditStatus idx={item.id} name={item.name} fetchData={fetchingData} />
            }));
            setfetchData(showData);
            setLoading(false);
        })
    }

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
            // render: (_, record) => (
            //     <div className='flex gap-x-3'>
            //         <EditStatus idx = {fetchData.id} name={fetchData.name} fetchData={fetchingData} />
            //     </div>
            // ),
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
