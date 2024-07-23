
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios, { Axios } from 'axios';
import "./tablestyle.css";

import Userlistdrawer from '../drawer/userlistdrawer';
import UserSearch from "../inputs/UserSearch";
import UserExport from "../buttons/UserExport";

export default function Deviceinfos({title}){
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
            title: 'IP address',
            width: 250,
            dataIndex: 'ipaddress',
            key: 'ipaddress',
        },
       {
            title: 'User Agent Name',
            dataIndex: 'user_agent_name',
            key: 'user_agent_name',
            width: 150,
        },
        {
            title: 'Device Brand',
            dataIndex: 'device_brand',
            key: 'device_brand',
            width: 150,
        },{
            title: 'Device Type',
            dataIndex: 'device_type',
            key: 'device_type',
            width: 150,
        },
        {
            title: 'Device Os',
            dataIndex: 'device_os',
            key: 'device_os',
            width: 150,
        },{
            title: 'OS Name',
            dataIndex: 'os_name',
            key: 'os_name',
            width: 150,
        },
        {
            title: 'Os Version',
            dataIndex: 'os_version',
            key: 'os_version',
            width: 150,
        }, {
            title: 'Time Zone',
            dataIndex: 'current_time',
            key: 'current_time',
            width: 180,
        },
        {
            title: 'Time ID',
            dataIndex: 'time_zone',
            key: 'time_zone',
            width: 150,
        },
        {
            title: 'Language',
            dataIndex: 'langauage',
            key: 'strelangauageet',
            width: 150,
        },
        {
            title: 'Flag Icon',
            dataIndex: 'flag',
            key: 'flag',
            width: 150,
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
            width: 150,
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
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
            <h2>{title}</h2>
            <div className="my-4 flex justify-between">
                <div className='flex gap-x-2'>
                    <UserExport/>
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
