
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import UserSearch from "../inputs/UserSearch";

import AddGender from '../models/SettingModels/AddGender';

export default function Genders({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users";

        axios.get(url).then(response => {
            const transformedData = response.data.map((item, index) => ({
                key: item.id,
                no: index + 1,
                id: item.id, 
                name: <Userlistdrawer name={item.name} userid={item.id}/>,
                email: item.email,
                website: item.website,
                city: item.address.city,
                street: item.address.street,
                zipcode: item.address.zipcode,
                latitude: item.address.geo.lat,
                longitude: item.address.geo.lng
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
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Status',
            width: 250,
            dataIndex: 'status_id',
            key: 'status_id',
        },
        {
            title: 'Admit By',
            dataIndex: 'admit_by',
            key: 'admit_by',
            width: 180,
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
            <div className="my-4 ">
                <div className='flex gap-x-2'>
                    <AddGender/>
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
