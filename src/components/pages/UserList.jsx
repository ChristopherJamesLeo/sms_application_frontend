
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Tag} from 'antd';
import "./../CustomCss/tablestyle.css";
import Adduser from '../models/Adduser';
import UserSearch from "../inputs/UserSearch";
import api from '../api/api';

import Userlistdrawer from '../drawer/UserDrawer';
import UserExport from '../export/UserExport';

export default function Userstable({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetching data
    const fetchingData = async () => {
        try {
            const response = await api.get('/users', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data.data)
            if (response.data && response.data.data) {
                console.log(response.data.data)
                let showData = response.data.data.map((item, index) => ({
                    key: item.id,
                    no: index + 1,
                    id: item.id,
                    name: <Userlistdrawer fetchData={fetchingData} name={item.name} userid={item.id}/>,
                    reg_id: item.regnumber,
                    point: item.userpoint?item.userpoint.topup : "0",
                    email: item.email,
                    gender: item.gender.name,
                    city: null,
                    country: item.country.name,
                    role: item.role.name,
                    createdAt : item.created_at,
                    onlinestatus :<div><Tag >{item.status.name}</Tag><Tag color={`${item.is_online ? "green" : "red"}`}>{item.active.name}</Tag></div>  ,
                    lastonline : item.updated_at,
                    
                }));
                // console.log(showData);
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
        fetchingData()
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
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },{
            title: 'Student Id',
            width: 200,
            dataIndex: 'reg_id',
            key: 'reg_id'
        },{
            title: 'Points',
            width: 200,
            dataIndex: 'point',
            key: 'point'
        },
        {
            title: 'Email',
            width: 250,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 150,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 150,
        },{
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 150,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 150,
        },
        {
            title: 'Registration Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
        },
        {
            title: 'Status',
            key: 'onlinestatus',
            dataIndex: 'onlinestatus',
            fixed: 'right',
            width: 250,
        },
        {
            title: 'Last Online',
            dataIndex: 'lastonline',
            key: 'lastonline',
            width: 250,
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
                <div className='mb-3 flex gap-x-2'>
                    <Adduser fetchData = {fetchingData}/>
                    {/* <UserExport/> */}
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                    <UserExport/>
                </div>
            </div>

            <Table
                dataSource={data}
                columns={columns}
                loading={Boolean(isLoading)}
                pagination={{ pageSize: 10 }}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
