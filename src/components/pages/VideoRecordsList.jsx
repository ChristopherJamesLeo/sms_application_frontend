
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message} from 'antd';
import api from '../api/api';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";

import AddRecordVideo from '../models/AddRecordVideo';
import EditRecordVideo from '../models/EditRecordVideo';
import UserSearch from "../inputs/UserSearch";
import Coursedrawer from '../drawer/Coursedrawer';

export default function Videorecords({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [courses,setCourses] = useState([]);
    const [stages,setStages] = useState([]);


    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetching data
    const fetchingData = async () => {
        try {
            console.log("hello");

            const response = await api.get('/videos', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data.videos);
                updateDate(response.data.videos);
                setCourses(response.data.courses);
                setStages(response.data.stages);
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

    // update data 
    function updateDate(videodata){
        console.log(videodata);
        let data = videodata;
        let showData = data.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            course_id :  <Coursedrawer courseId = {item.course.id} name={item.course.name} />,
            video_link : item.link,
            count : item.count,
            admit_by : item.user.name,
            status_id : item.status.name,
            action : <EditRecordVideo/>
        }));
        setLoading(false)
        setfetchData(showData);
    }

    // end update data

    useEffect(() => {
        fetchingData();
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
            title: 'Course Id',
            width: 200,
            dataIndex: 'course_id',
            key: 'course_id',
            fixed: 'left',
        },
        {
            title: 'Link',
            width: 250,
            dataIndex: 'video_link',
            key: 'video_link',
        },
        {
            title: 'Download Count',
            dataIndex: 'count',
            key: 'count',
            width: 180,
        },
        {
            title: 'Admit By',
            dataIndex: 'admit_by',
            key: 'admit_by',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 150,
        },
        {
            title: "Action",
            dataIndex : "action",
            key : "action",
            width : 200
        }
    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            <h2 className='table_title'>{title}</h2>
            {contextHolder}
            <div className="my-4 ">
                <div className='mb-3 flex gap-x-2'>
                    <AddRecordVideo />
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
