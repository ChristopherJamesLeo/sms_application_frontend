
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Badge , Tag} from 'antd';
import api from '../api/api';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import UserSearch from "../inputs/UserSearch";
import AddIpBan,{DeletIpBan} from '../models/AddIpBan';

export default function IpBanList({title}){
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


            const response = await api.get('/ipbanlists', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
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
    // end fetching Data

    //  
    function updateDate(IpBanData){
        console.log(IpBanData);
        let showData = IpBanData.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            ipaddress: item.ip,
            remark: item.remark,
            status_id : <Tag bordered={true} color="default">
                <Badge status="error" className='me-3' />
                {item.status.name}
            </Tag>,
            admit_id : item.admit.name,
            created_at : item.created_at,
            updated_at : item.updated_at,
            action : <div>
                <DeletIpBan ipId={item.id} fetchingData={fetchingData} />
            </div>
            
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
        },{
            title: 'IP Address',
            width: 250,
            dataIndex: 'ipaddress',
            key: 'ipaddress',
        },{
            title: 'Remark',
            width: 250,
            dataIndex: 'remark',
            key: 'remark',
        },{
            title: 'Status',
            width: 250,
            dataIndex: 'status_id',
            key: 'status_id',
        },
        {
            title: 'Admit',
            width: 250,
            dataIndex: 'admit_id',
            key: 'admit_id',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
        }, 
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 180,
        }, 
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }, 

    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            <h2 className='table_title'>{title}</h2>
            <div className="my-4 ">
                <div className='flex gap-x-2'>
                    <AddIpBan fetchingData = {fetchingData}/>
                </div>
                <div className='flex justify-end'>
                    {contextHolder}
                    <UserSearch/>
                </div>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 15 }}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
