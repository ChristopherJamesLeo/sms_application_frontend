
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
                    // key: item.id,
                    // no: index + 1,
                    // id: item.id, 
                    // name: <Coursedrawer name={item.name} postid={item.id}/>,
                    // trainer: item.trainer_id,
                    // categories: item.category_id,
                    // level: item.level_id,
                    // type: item.classtype_id,
                    // fee: item.fee,
                    // zoomId: item.zoomId,
                    // passcode: item.passcode,
                    // roomNo: item.roomNo,
                    // address: item.address,
                    // location: item.location,
                    // date: Array.isArray(item.date) ? item.date.map((date, idx) => <span key={idx}>{date} </span>) : "loading...",
                    // time:  Array.isArray(item.time) ? item.time.map((time, idx) => <span key={idx}>{time} </span>) : "loading...",
                    // days:  Array.isArray(item.days) ? item.days.map((day, idx) => <span key={idx}>{day}</span>) : "loading...",
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
        },{
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Categorie',
            width: 200,
            dataIndex: 'categorie',
            key: 'categorie',
            fixed: 'left',
        },
        {
            title: 'Course Id',
            width: 200,
            dataIndex: 'regId',
            key: 'regId',
        },
        {
            title: 'Post By',
            width: 200,
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Trainer',
            width: 200,
            dataIndex: 'trainer',
            key: 'trainer',
        },
        {
            title: 'Type',
            width: 200,
            dataIndex: 'type_id',
            key: 'type_id',
        },{
            title: 'Level',
            width: 200,
            dataIndex: 'level_id',
            key: 'level_id',
        },{
            title: 'Status',
            width: 200,
            dataIndex: 'status_id',
            key: 'status_id',
        },{
            title: 'Payment Type',
            width: 200,
            dataIndex: 'paymenttype_id',
            key: 'paymenttype_id',
        },{
            title: 'Fee',
            width: 200,
            dataIndex: 'fee',
            key: 'fee',
        },{
            title: 'video_count',
            width: 200,
            dataIndex: 'video_count',
            key: 'video_count',
        },{
            title: 'point',
            width: 200,
            dataIndex: 'point',
            key: 'point',
        },{
            title: 'Student Count',
            width: 200,
            dataIndex: 'student_count',
            key: 'student_count',
        },{
            title: 'Cover Photo',
            width: 200,
            dataIndex: 'image',
            key: 'image',
        },{
            title: 'State Date',
            width: 200,
            dataIndex: 'start_date',
            key: 'start_date',
        },{
            title: 'End Date',
            width: 200,
            dataIndex: 'end_date',
            key: 'end_date',
        },{
            title: 'Start Time',
            width: 200,
            dataIndex: 'start_time',
            key: 'start_time',
        },{
            title: 'End Time',
            width: 200,
            dataIndex: 'end_time',
            key: 'end_time',
        },{
            title: 'Days',
            width: 200,
            dataIndex: 'days',
            key: 'days',
        },{
            title: 'Created At',
            width: 200,
            dataIndex: 'created_at',
            key: 'created_at',
        },{
            title: 'Updated At',
            width: 200,
            dataIndex: 'updated_at',
            key: 'updated_at',
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
