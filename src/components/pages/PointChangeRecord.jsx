
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import AddPoint from '../models/AddPoint';
import UserSearch from "../inputs/UserSearch";

export default function PointChangeRecord({title}){
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
            title: 'Platform Name',
            width: 200,
            dataIndex: 'social_name_id',
            key: 'social_name_id',
            fixed: 'left',
        },
        {
            title: 'Links',
            width: 250,
            dataIndex: 'links',
            key: 'links',
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
                <div className='mb-3 flex gap-x-2'>
                    <AddPoint/>
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            <div className='mb-4 flex justify-between gap-x-5'>
                <div className=' flex-1 p-5 rounded text-center bg-blue-100'>
                    <h3 className='text-lg mb-2'>Total Point</h3>
                    <span className='text-xl'>100000</span>
                </div>
                <div className=' flex-1 p-5 rounded text-center bg-green-100'>
                    <h3 className='text-lg mb-2'>Current Point</h3>
                    <span className='text-xl'>201942</span>
                </div>
                <div className=' flex-1 p-5 rounded text-center bg-pink-100'>
                    <h3 className='text-lg mb-2'>Using Point</h3>
                    <span className='text-xl'>1293829</span>
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
