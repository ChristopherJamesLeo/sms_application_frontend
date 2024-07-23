
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios, { Axios } from 'axios';
import "./tablestyle.css";

import Userlistdrawer from '../drawer/userlistdrawer';
import UserSearch from "../inputs/UserSearch";

export default function Gpalist({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users";

        axios.get(url).then(response => {
            const transformedData = response.data.map((item, index) => ({
                // key: item.id,
                // no: index + 1,
                // id: item.id, 
                // name: <Userlistdrawer name={item.name} userid={item.id}/>,
                // email: item.email,
                // website: item.website,
                // city: item.address.city,
                // street: item.address.street,
                // zipcode: item.address.zipcode,
                // latitude: item.address.geo.lat,
                // longitude: item.address.geo.lng
            }));
            setfetchData(transformedData);
            setLoading(false);
        }).catch(error => {
            console.error("There was an error fetching the data!", error);
        });
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
            width: 200,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },
        {
            title: 'Course Point',
            width: 250,
            dataIndex: 'coursepoint',
            key: 'coursepoint',
        },
        {
            title: 'Teacher Point',
            width: 250,
            dataIndex: 'teacherpoint',
            key: 'teacherpoint',
        },
        {
            title: 'Admit By',
            width: 250,
            dataIndex: 'admit_by',
            key: 'admit_by',
        },
        {
            title: 'Status',
            width: 250,
            dataIndex: 'status_id',
            key: 'status_id',
        },
        
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div className='flex gap-x-3'>
                    <Link to={`/view/${record.id}`} className='text-green-700'>View</Link>
                    <Link to={`/edit/${record.id}`} className='text-blue-700'>Edit</Link>
                    <Link to={`/delete/${record.id}`} className='text-red-700'>Delete</Link>
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
            <div className="my-4 flex justify-between">
                <div className='flex gap-x-2'>
                </div>
                <UserSearch/>
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
