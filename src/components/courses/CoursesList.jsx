
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Tag} from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';

import Coursedrawer from './Coursedrawer';
import Postcomments from '../drawer/Postcommets';
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import UserSearch from "../inputs/UserSearch";

import CourseExport from '../export/CourseExport';

export default function Courses({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    // start fetching data
    const fetchingData = async () => {
        try {
            const response = await api.get('/courses', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            // console.log(response.data)
            if (response.data) {
                // console.log(response.data)
                let data = response.data.courses;
                let showData = data.map((item, index) => ({
                    key: item.id,
                    no: index + 1,
                    id: item.id,
                    name: <Coursedrawer fetchData={fetchingData} courseId = {item.id} name={item.name} />,
                    categorie: item.category.name,
                    regId: item.regId,
                    totalDownLoadCount: item.totalVideoDownloadCount,
                    user_id: item.user.name,
                    trainer: item.trainer.name,
                    type_id: item.courseType.name,
                    level_id: item.level.name,
                    visibility_id: item.visibility.name,
                    status_id: item.status.name,
                    fee: item.fee,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    action : <EditCourse courseId={item.id} fetchData={fetchingData}  />
                }));
                // console.log(showData);
                setLoading(false)
                setfetchData(showData);
                
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

    useEffect(() => {
        fetchingData();
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
            fixed: 'left',
        },
        {
            title: 'Categorie',
            width: 200,
            dataIndex: 'categorie',
            key: 'categorie',

        },
        {
            title: 'Course Id',
            width: 200,
            dataIndex: 'regId',
            key: 'regId',
        },
        {
            title: 'Download Count',
            width: 200,
            dataIndex: 'totalDownLoadCount',
            key: 'totalDownLoadCount',
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
            title: 'Visibility',
            width: 200,
            dataIndex: 'visibility_id',
            key: 'visibility_id',
        },{
            title: 'Status',
            width: 200,
            dataIndex: 'status_id',
            key: 'status_id',
        },{
            title: 'Fee',
            width: 200,
            dataIndex: 'fee',
            key: 'fee',
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
        },{
            title: 'Action',
            width: 200,
            dataIndex: 'action',
            key: 'updatedaction_at',
            fixed: 'right',
        },
    ]
    // end demo 
    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            {contextHolder}
            <h2 className='table_title'>{title}</h2>
            <div className="my-4 ">
                <div className='mb-2 flex gap-x-2'>
                    <AddCourse fetchData={fetchingData} />
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                    <CourseExport/>
                </div>
            </div>
            
            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={true}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
