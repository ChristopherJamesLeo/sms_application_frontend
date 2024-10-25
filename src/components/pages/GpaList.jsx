import React, { useEffect, useState } from 'react';
import { Table, Badge, message } from 'antd';
import api from '../api/api';
import UserSearch from "../inputs/UserSearch";
import "./../CustomCss/tablestyle.css";

export default function Gpalist({ title }) {
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    // Fetching data
    const fetchingData = async () => {
        try {
            console.log("Fetching data...");
            const response = await api.get('/gpapoints', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });

            if (response.data) {
                console.log(response.data);
                updateDate(response.data);
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

    // Update data
    function updateDate(gpadatas) {
        let showdatas = gpadatas.map((item, idx) => {
            let total_attendant = 0;
            let total_valid_attendant = 0;
    
            const coursegpas = item.courses.map((course, i) => ({
                key: Math.floor(Math.random() * 1000),
                no: i + 1,
                id: course.course_id,
                join_date: course.join_date,
                course_name: course.course_name,
                status: <Badge status={`${course.status.id == 3 ? "success" : "error"}`} text={course.status.name}/>,

                total_count: course.total_attendances,
                attendance_count: course.valid_attendances,
                percentage: Math.round(course.average_points) + " %",
            }));
    

            coursegpas.forEach(function(coursegpa) {
                total_attendant += Number(coursegpa.total_count);
                total_valid_attendant += Number(coursegpa.attendance_count);
            });
    
            let gpa_point = total_valid_attendant > 0 ? Math.round(( total_attendant / total_valid_attendant ) * 100) : 0 ;
          
    
            return {
                key: Math.floor(Math.random() * 1000),
                no: idx + 1,
                student_id: item.student_regnumber,
                total_count: total_attendant, 
                attendance_count: total_valid_attendant, 
                gpa_point: gpa_point + " %",
                coursesData: coursegpas
            };
        });
    
        console.log(showdatas);
        setfetchData(showdatas);
    }
    

    useEffect(() => {
        fetchingData();
    }, []);

    // Columns for the expanded table
    const expandColumns = [
        {
            title: 'No',
            width: 60,
            dataIndex: 'no',
            key: 'no',
            fixed: 'left',
        },
        {
            title: 'Join Date',
            dataIndex: 'join_date',
            key: 'join_date',
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'Status',
            key: 'state',
            dataIndex: 'status',
        },
        {
            title: 'Total Count',
            dataIndex: 'total_count',
            key: 'total_count',
        },
        {
            title: 'Attendance Count',
            dataIndex: 'attendance_count',
            key: 'attendance_count',
        },
        {
            title: 'Percentage',
            key: 'percentage',
            dataIndex: 'percentage',
        },
        {
            title: 'Grade',
            key: 'grade',
            dataIndex: 'grade'
        },
    ];

    // Main table columns
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
            dataIndex: 'student_id',
            key: 'student_id',
        },
        {
            title: 'Total Count',
            dataIndex: 'total_count',
            key: 'total_count',
        },
        {
            title: 'Attendance Count',
            dataIndex: 'attendance_count',
            key: 'attendance_count',
        },
        {
            title: 'GPA Point',
            dataIndex: 'gpa_point',
            key: 'gpa_point',
        }
    ];

    const expandedRowRender = (record) => (
        <Table columns={expandColumns} dataSource={record.coursesData} pagination={false} />
    );

    return (
        <div className="table-container">
            <h2 className='table_title'>{title}</h2>
            {contextHolder}
            <div className="my-4">
                <div className='flex gap-x-2'></div>
                <div className='flex justify-end'>
                    <UserSearch />
                </div>
            </div>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender,
                }}
                bordered
                dataSource={data}
                loading={isLoading}
                size="medium"
            />
        </div>
    );
}
