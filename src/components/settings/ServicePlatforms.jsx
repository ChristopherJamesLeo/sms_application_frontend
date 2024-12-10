
import React, { useEffect, useState } from 'react';
import { Table , Switch , message } from 'antd';
import "./../CustomCss/tablestyle.css";
import api from '../api/api';
import AddServicePlatform,{EditServicePlatform} from '../models/SettingModels/ServicePlatform';


export default function ServicePlatform({title}){
    var [showData, setfetchData] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });
    
    // start active switch
    const onChange = async (checked, idx) => {
        // console.log(idx);
        let statusId = checked ? 3 : 4; 
        // console.log("status id is", statusId);
        
        let values = {
            id: idx,
            status_id: statusId
        };
        
        try {
            const response = await api.put(`/serviceplatforms/status/${idx}`, values, {
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

            // Fetch data from your API
            const response = await api.get('/serviceplatforms', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });

            // console.log(response.data.statuses);

            if (response.data && response.data.stages) {
                setStatuses(response.data.statuses);
                updateStageData(response.data.stages);
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

    // Function to format and update fetched data
    const updateStageData = (stageData) => {
        // console.log(stageData);
        const formattedData = stageData.map((item, index) => ({
            
            key: item.id,
            no: index + 1,
            id: item.id,
            name: item.name,
            status_id: (
                <Switch 
                    defaultChecked={item.status.id === 3} 
                    onChange={(checked) => onChange(checked, item.id)} 
                />
            ),
            admit_by: item.user.name,
            created_at: item.created_at,
            updated_at: item.updated_at,
            action: (
                <EditServicePlatform 
                    idx={item.id} 
                    name={item.name} 
                    fetchData={fetchingData} 
                />
            )
        }));
        // console.log(formattedData);
        setfetchData(formattedData);
    };

    useEffect(() => {
        // Fetch the data when the component mounts
        fetchingData();

        // Cleanup function to unsubscribe from Pusher when the component unmounts
        return () => {
            if (Pusher.instances.length > 0) {
                Pusher.instances[0].disconnect();
            }
        };
    }, []);


    // end active switch

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
            dataIndex: 'action',
            key: 'action',
            width: 180,
        },
    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <> 
            <div className="table-container">
                {contextHolder}
                <h2 className='table_title'>{title}</h2>
                <div className="my-4 ">
                    <div className='flex gap-x-2 mb-2'>
                        <AddServicePlatform userData ={setfetchData} fetchData={fetchingData} />
                    </div>
                    <div className='flex justify-end'>
                        {/* <UserSearch/> */}
                        
                    </div>
                </div>
                <Table
                    dataSource={showData}
                    columns={columns}
                    loading={isLoading}
                    pagination={false}
                    scroll={{ x: {tableWidth} , y : "68vh" }}
                />
            </div>
        </>

    );
};
