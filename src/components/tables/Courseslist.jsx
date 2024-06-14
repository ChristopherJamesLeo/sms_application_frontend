
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios, { Axios } from 'axios';
import "./tablestyle.css";

import Coursedrawer from '../drawer/Coursedrawer';
import Postcomments from '../drawer/Postcommets';
import AddCourse from '../models/AddCourse';

export default function Courses({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        // let url = "https://jsonplaceholder.typicode.com/users";

        let url = "https://jsonplaceholder.typicode.com/posts";

        axios.get(url).then(response => {
            const transformedData = response.data.map((item, index) => ({

                // start course
                // key: item.id,
                // no: index + 1,
                // id: item.id, 
                // name: <Coursedrawer name={item.name} userid={item.id}/>,
                // email: item.email,
                // website: item.website,
                // city: item.address.city,
                // street: item.address.street,
                // zipcode: item.address.zipcode,
                // latitude: item.address.geo.lat,
                // longitude: item.address.geo.lng,
                // days: "Mon / Thu / Wed / Tue / Fri / Sat / Sun"
                // end course

                // start demo
                    key: item.id,
                    no: index + 1,
                    id: item.id, 
                    title: <Coursedrawer name={item.title} postid={item.id}/>,
                    body: item.body,
                // end demo
            }));
            setfetchData(transformedData);
            setLoading(false);
        }).catch(error => {
            console.error("There was an error fetching the data!", error);
        });
    }, []);

    
    // const columns = [
    //     {
    //         title: 'No',
    //         width: 60,
    //         dataIndex: 'no',
    //         key: 'no',
    //         fixed: 'left',
    //     },
    //     {
    //         title: 'Categories',
    //         width: 200,
    //         dataIndex: 'name',
    //         key: 'name',
    //         fixed: 'left',
    //     },
    //     {
    //         title: 'Class',
    //         width: 250,
    //         dataIndex: 'email',
    //         key: 'email',
    //     },
    //     {
    //         title: 'Class Type',
    //         dataIndex: 'website',
    //         key: 'website',
    //         width: 180,
    //     },
    //     {
    //         title: 'Fee',
    //         dataIndex: 'city',
    //         key: 'city',
    //         width: 150,
    //     },
    //     {
    //         title: 'Trainer',
    //         dataIndex: 'street',
    //         key: 'street',
    //         width: 150,
    //     },
    //     {
    //         title: 'Start Date',
    //         dataIndex: 'latitude',
    //         key: 'latitude',
    //         width: 150,
    //     },
    //     {
    //         title: 'End Date',
    //         dataIndex: 'longitude',
    //         key: 'longitude',
    //         width: 150,
    //     },
    //     {
    //         title: 'Start Time',
    //         dataIndex: 'longitude',
    //         key: 'longitude',
    //         width: 150,
    //     },
        
    //     {
    //         title: 'End Time',
    //         dataIndex: 'longitude',
    //         key: 'longitude',
    //         width: 150,
    //     },
    //     {
    //         title: 'Days',  // 3 days in a week or 4 days in a week
    //         dataIndex: 'days',
    //         key: 'longitude',
    //         width: 200,
    //     },
    //     {
    //         title: 'Action',
    //         key: 'operation',
    //         fixed: 'right',
    //         width: 150,
    //         render: (_, record) => (
    //             <div className='flex gap-x-3'>
    //                 <Link to={`/view/${record.id}`} className='text-green-700'>View</Link>
    //                 <Link to={`/edit/${record.id}`} className='text-blue-700'>Edit</Link>
    //                 <Link to={`/delete/${record.id}`} className='text-red-700'>Delete</Link>
    //             </div>
    //         ),
    //     },
    // ];

    // start demo 
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
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
        },
        {
            title: 'Body',
            width: 800,
            dataIndex: 'body',
            key: 'body',
        }
    ]
    // end demo 
    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            <h2>{title}</h2>
            <div className="my-3">
                <AddCourse />
            </div>
            
            <Table
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={true}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
