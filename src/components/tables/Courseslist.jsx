
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

        let url = "https://jsonplaceholder.typicode.com/users";

        // let url = "https://666f5437f1e1da2be52288af.mockapi.io/SMS/courses";

        axios.get(url).then(response => {
            const transformedData = response.data.map((item, index) => ({

                // start demo
                    key: item.id,
                    no: index + 1,
                    id: item.id, 
                    name: <Coursedrawer name={item.name} postid={item.id}/>,
                    trainer: item.trainer_id,
                    categories: item.category_id,
                    level: item.level_id,
                    type: item.classtype_id,
                    fee: item.fee,
                    zoomId: item.zoomId,
                    passcode: item.passcode,
                    roomNo: item.roomNo,
                    address: item.address,
                    location: item.location,
                    date: Array.isArray(item.date) ? item.date.map((date, idx) => <span key={idx}>{date} </span>) : "loading...",
                    time:  Array.isArray(item.time) ? item.time.map((time, idx) => <span key={idx}>{time} </span>) : "loading...",
                    days:  Array.isArray(item.days) ? item.days.map((day, idx) => <span key={idx}>{day}</span>) : "loading...",
                // end demo
            }));
            setfetchData(transformedData);
            setLoading(false);
        }).catch(error => {
            console.error("There was an error fetching the data!", error);
        });
    }, []);

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
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Trainer',
            width: 200,
            dataIndex: 'trainer',
            key: 'trainer',
        },
        {
            title: 'Categories',
            width: 200,
            dataIndex: 'categories',
            key: 'categories'
        },
        {
            title: 'Level',
            width: 200,
            dataIndex: 'level',
            key: 'level'
        },
        {
            title: 'Type',
            width: 200,
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'fee',
            width: 200,
            dataIndex: 'fee',
            key: 'fee'
        },
        {
            title: 'zoom Id',
            width: 200,
            dataIndex: 'zoomId',
            key: 'zoomId'
        },
        {
            title: 'Pass Code',
            width: 200,
            dataIndex: 'passcode',
            key: 'passcode',
        },
        {
            title: 'Room No',
            width: 200,
            dataIndex: 'roomNo',
            key: 'roomNo',
        },
        {
            title: 'Address',
            width: 200,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Location',
            width: 200,
            dataIndex: 'location',
            key: 'location',
        }
        ,
        {
            title: 'Date',
            width: 500,
            dataIndex: 'date',
            key: 'date',
        }
        ,
        {
            title: 'Time',
            width: 400,
            dataIndex: 'time',
            key: 'time',
        }
        ,
        {
            title: 'Days',
            width: 100,
            dataIndex: 'days',
            key: 'days',
        }, 
        // {
        //     title: 'Action',
        //     key: 'operation',
        //     fixed: 'right',
        //     width: 150,
        //     render: (_, record) => (
        //         <div className='flex gap-x-3'>
        //             <Link to={`/view/${record.id}`} className='text-green-700'>View</Link>
        //             <Link to={`/edit/${record.id}`} className='text-blue-700'>Edit</Link>
        //             <Link to={`/delete/${record.id}`} className='text-red-700'>Delete</Link>
        //         </div>
        //     ),
        // },
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
