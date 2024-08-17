
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Tag} from 'antd';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';

import Coursedrawer from '../drawer/Coursedrawer';
import Postcomments from '../drawer/Postcommets';
import AddCourse from '../models/AddCourse';
import UserSearch from "../inputs/UserSearch";

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
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                let data = response.data.courses;
                let showData = data.map((item, index) => ({
                    key: item.id,
                    no: index + 1,
                    id: item.id,
                    name: <Coursedrawer days={response.data.days} coursedata = {item} name={item.name} />,
                    categorie: item.category.name,
                    regId: item.regId,
                    user_id: item.user.name,
                    trainer: item.trainer.name,
                    type_id: item.courseType.name,
                    level_id: item.level.name,
                    status_id: item.status.name,
                    fee: item.fee,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                }));
                console.log(showData);
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
                </div>
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
