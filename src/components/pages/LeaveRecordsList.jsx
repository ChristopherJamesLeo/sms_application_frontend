
import React, { useEffect, useState } from 'react';
import { Table , message } from 'antd';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';

import Userlistdrawer from '../drawer/UserDrawer';
import Coursedrawer from '../drawer/Coursedrawer';
import AddLeave from './../models/AddLeave' ;
import UserSearch from "../inputs/UserSearch";
import {VerifyButton} from "./../models/AddLeave";
import LeaveExport from '../export/LeaveExport';


export default function LeaveRecordsList({title}){
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

            const response = await api.get('/leaves', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                let data = response.data;
                updateDate(data.leaves);
                setCourses(data.courses);
                setStages(data.stages);
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

    //  
    function updateDate(leaveData){
        let showData = leaveData.map((item, index) => ({
                    
            key: item.id,
            no: index + 1,
            id: item.id,
            user_id :  item.user.name,
            reg_number :  <Userlistdrawer userid = {item.user.id}  name={item.user.regnumber} />,
            course_id :  <Coursedrawer courseId = {item.course.id} name={item.course.name} />,
            remark : item.remark,
            datetime : item.datetime,
            stage_id : item.stage.name,
            admit_by : item.admit_by.name,
            created_at : item.created_at,
            updated_at : item.updated_at,
            action : <VerifyButton leaveId ={item?item.id:false} stageId = {item?item.stage.id:false} fetchData={fetchingData} />
            
        }));
        console.log(showData);
        setLoading(false)
        setfetchData(showData);
    }
    // 

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
            title: 'Full Name',
            width: 200,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },{
            title: 'Reg Number',
            width: 200,
            dataIndex: 'reg_number',
            key: 'reg_number',
            fixed: 'left',
        },
        {
            title: 'Course',
            width: 250,
            dataIndex: 'course_id',
            key: 'course_id',
        },
        {
            title: 'Date and Time',
            dataIndex: 'datetime',
            key: 'datetime',
            width: 180,
        }, {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 180,
        },{
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark',
            width: 150,
        },{
            title: 'Stage',
            dataIndex: 'stage_id',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Approve By',
            dataIndex: 'admit_by',
            key: 'admit_by',
            width: 150,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
        },{
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 200,
        },{
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 200,
        },

    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            {contextHolder}
            <h2 className='table_title'>{title}</h2>
            <div className="my-4">
                <div className='mb-3 flex gap-x-2'>
                    <AddLeave fetchData = {fetchingData}/>
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                    <LeaveExport courses={courses} stages={stages} updateDate={updateDate} />
                </div>
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
