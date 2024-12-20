
import React, { useEffect, useState } from 'react';
import { Table , message } from 'antd';
import "./../../CustomCss/tablestyle.css";
import api from '../../api/api';

import Userlistdrawer from '../../userManagement/user/UserDrawer';
import Coursedrawer from '../../courses/Coursedrawer';
import AddAttended from './AddAttended';
import AttendantExport from '../../export/AttendantExport';



export default function AttendantLists({title}){
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

            const response = await api.get('/attendants', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                updateDate(response.data.attendants);
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
    function updateDate(attendantdata){
        // console.log(attendantdata);
        let data = attendantdata;
        let showData = data.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            user_id : item.user.name,
            regnumber : <Userlistdrawer userid = {item.user.id}  name={item.user.regnumber} />,
            course_id :  <Coursedrawer courseId = {item.course.id} name={item.course.name} />,
            attendant_code : item.attcode,
            datetime : item.date,
            status_id : item.status.name,
            admit_by : item.admit_by.name,
            created_at : item.created_at,
            updated_at : item.updated_at

            
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
            title: 'Full Name',
            width: 200,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },{
            title: 'Reg Number',
            width: 200,
            dataIndex: 'regnumber',
            key: 'regnumber',
            fixed: 'left',
        },
        {
            title: 'Course',
            width: 250,
            dataIndex: 'course_id',
            key: 'course_id',
        },
        {
            title: 'Attended Code',
            dataIndex: 'attendant_code',
            key: 'attendant_code',
            width: 150,
        },
        {
            title: 'Date and Time',
            dataIndex: 'datetime',
            key: 'datetime',
            width: 180,
        },{
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Admit By',
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
                    <AddAttended fetchData = {fetchingData}/>
                </div>
                <div className='flex justify-end space-x-2'>
                    <AttendantExport courses={courses} stages={stages} updateDate={updateDate}/>
                    {/* <AttendantImport/> */}
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
