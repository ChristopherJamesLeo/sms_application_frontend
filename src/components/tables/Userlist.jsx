
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import Adduser from '../models/Adduser';
import axios, { Axios } from 'axios';
import "./tablestyle.css";

import Userlistdrawer from '../drawer/userlistdrawer';

export default function Userstable({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = "https://666f5437f1e1da2be52288af.mockapi.io/SMS/users";

        axios.get(url).then(response => {
            const transformedData = response.data.map((item, index) => ({
                key: item.id,
                no: index + 1,
                id: item.id, 
                name: <Userlistdrawer name={item.name} userid={item.id}/>,
                email: item.email,
                website: item.website,
                city: item.city,
                street: item.street,
                zipcode: item.zipcode,
                latitude: item.latitude,
                longitude: item.longitude
            }));
            setfetchData(transformedData);
            setLoading(false);
            
        }).catch(error => {
            console.error("There was an error fetching the data!", error);
            setLoading(false);
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
            title: 'Full Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
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
            title: 'Status',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <div className='flex gap-x-3'>
                    <Link to={`/delete/${record.id}`} className='text-red-700'>Online</Link>
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
            <h2 className='text-lg'>{title}</h2>
            <div className="my-4">
                <Adduser />
            </div>
            
            <Table
                dataSource={data}
                columns={columns}
                loading={Boolean(isLoading)}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
