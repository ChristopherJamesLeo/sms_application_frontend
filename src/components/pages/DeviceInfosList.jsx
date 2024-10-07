
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message } from 'antd';
import api from '../api/api';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import UserSearch from "../inputs/UserSearch";

export default function Deviceinfos({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    // start fetching data
    const fetchingData = async () => {
        try {
            console.log("hello");

            const response = await api.get('/useroperations', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data);
                updateDate(response.data);
                // setCourses(response.data.courses);
                // setStages(response.data.stages);
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
    function updateDate(getdatas){
        console.log(getdatas);
        let data = getdatas;
        let showData = data.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            user_id : <Userlistdrawer userid = {item.user.id}  name={item.user.regnumber} />,
            ipaddress : item.ip,
            city : item.city,
            country : item.country,
            timezone : item.timezone,
            browser : item.browser,
            brand : item.brand,
            type : item.type,
            os : item.os,
            insert_type : item.insert_type,
            connection : item.connection,
            status : item.status.name,
            created_at : item.created_at,
            updated_at : item.updated_at

            
        }));
        setLoading(false)
        setfetchData(showData);
        console.log(data);
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
            title: 'Student Id',
            width: 100,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },
        {
            title: 'IP address',
            width: 100,
            dataIndex: 'ipaddress',
            key: 'ipaddress',
        },{
            title: 'insert_type',
            dataIndex: 'insert_type',
            key: 'insert_type',
            width: 150,
        },
       {    
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 150,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 150,
        },
        {
            title: 'timezone',
            dataIndex: 'timezone',
            key: 'timezone',
            width: 150,
        },{
            title: 'browser',
            dataIndex: 'browser',
            key: 'browser',
            width: 150,
        },
        {
            title: 'brand',
            dataIndex: 'brand',
            key: 'brand',
            width: 150,
        },{
            title: 'type',
            dataIndex: 'type',
            key: 'type',
            width: 150,
        },
        {
            title: 'Os',
            dataIndex: 'os',
            key: 'os',
            width: 150,
        },{
            title: 'connection',
            dataIndex: 'connection',
            key: 'connection',
            width: 300,
        },{
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },{
            title: 'created at',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
        },{
            title: 'updated at',
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
            <h2 className='table_title'>{title}</h2>
            <div className="my-4 flex justify-end">
                {contextHolder}
                <UserSearch/>
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
