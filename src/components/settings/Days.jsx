
import React, { useEffect, useState } from 'react';
import { Table , message , Switch} from 'antd';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';

import UserSearch from "../inputs/UserSearch";

import AddDay,{EditDay} from '../models/SettingModels/Days';

export default function Days({title}){
    var [fetchData, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onChange = async (checked, idx) => {
        // console.log(idx);
        let statusId = checked ? 3 : 4; 
        // console.log("status id is", statusId);
        
        let values = {
            id: idx,
            status_id: statusId
        };
        
        try {
            const response = await api.put(`/days/status/${idx}`, values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                success("Edit successful");
            } else {
                error("Edit failed.");
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
    // end active switch

    const fetchingData = async () => {
        try {
            const response = await api.get('/days', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data.data)
            if (response.data && response.data.data) {
                console.log(response.data.data)
                let showData = response.data.data.map((item, index) => ({
                    key: item.id,
                    no: index + 1,
                    id: item.id,
                    name: item.name,
                    status_id: (
                        <Switch 
                        defaultChecked={item.status.id === 3} 
                        onChange={(checked) => onChange(checked, item.id)} />
                    ),
                    admit_by: item.user.name,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    action: 
                        <EditDay 
                            idx={item.id} 
                            name={item.name} 
                            fetchData={fetchingData} 
                        />
                    
                }));
                // console.log(showData);

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

    useEffect(() => {
        fetchingData()
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
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Status',
            width: 250,
            dataIndex: 'status_id',
            key: 'status_id',
        },
        {
            title: 'Admit By',
            dataIndex: 'admit_by',
            key: 'admit_by',
            width: 180,
        },{
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
        },{
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 180,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            dataIndex: "action",
            width: 150,
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
            <div className="my-4 ">
                <div className=' mb-3 flex gap-x-2'>
                    <AddDay fetchData = {fetchingData} />
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                </div>
            </div>
            <Table
                dataSource={fetchData}
                columns={columns}
                loading={isLoading}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
