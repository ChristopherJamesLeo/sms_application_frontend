
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
// import Adduser from '../models/Adduser';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import Adduser from '../models/Adduser';
import UserSearch from "../inputs/UserSearch";

import Userlistdrawer from '../drawer/UserDrawer';

export default function Appeals({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(false);


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
            key: 'reg_id',
            fixed: 'left',
        },{
            title: 'Points',
            width: 200,
            dataIndex: 'point',
            key: 'point',
            fixed: 'left',
        },
        {
            title: 'Email',
            width: 250,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            width: 180,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 150,
        },
        {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
        },
        {
            title: 'Zip-code',
            dataIndex: 'zipcode',
            key: 'zipcode',
            width: 150,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },
        {
            title: 'Online/Offline',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div className='flex justify-center'>
                    <Link to={`/userlists/delete/${record.id}`} className='text-red-700'>Online</Link>
                </div>
            ),
        },
        {
            title: 'Last Online',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div className='flex gap-x-3'>
                    <Link to={`/userlists/delete/${record.id}`} className='text-red-700'>Last Seen Online</Link>
                </div>
            ),
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
                    
                    {/* <UserExport/> */}
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            
            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={Boolean(isLoading)}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
