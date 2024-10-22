
import React, { useEffect, useState ,useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Tooltip , Switch} from 'antd';
import axios, { Axios } from 'axios';
import api from '../api/api';
import "./../CustomCss/tablestyle.css";

import Userlistdrawer from '../drawer/UserDrawer';
import AddAnnouncement from '../models/AddAnnouncement';
import EditAnnouncement , { DeleteAnnouncement } from '../models/EditAnnouncement';
import UserSearch from "../inputs/UserSearch";

export default function Announcements({title}){
    const [data, setfetchData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [courses,setCourses] = useState([]);
    const [stages,setStages] = useState([]);


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
            const response = await api.put(`/announcements/status/${idx}`, values, {
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


    // start fetching data
    const fetchingData = async () => {
        try {
            // console.log("hello");

            const response = await api.get('/announcements', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            // console.log(response.data)
            if (response.data) {
                // console.log(response.data)
                let data = response.data;
                updateDate(data.announcements);
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

    const [arrow, setArrow] = useState('Show');
    const mergedArrow = useMemo(() => {
      if (arrow === 'Hide') {
        return false;
      }
      if (arrow === 'Show') {
        return true;
      }
      return {
        pointAtCenter: true,
      };
    }, [arrow]);
    //  
    function updateDate(announcementData){
        let showData = announcementData.map((item, index) => ({
                    
            key: item.id,
            no: index + 1,
            id: item.id,
            title :  item.title,
            admit_id :  <Userlistdrawer userid = {item.user.id}  name={item.user.name} />,
            reg_id :  item.generate_id,
            description :  <Tooltip
                                placement="left"
                                title={<div dangerouslySetInnerHTML={{ __html: item.description }} />}
                                arrow={mergedArrow}>
                                <div dangerouslySetInnerHTML={{ __html: item.description.substring(0,20)}} />
                            </Tooltip>,
            image : item.image,
            visibility : item.visibility.name,
            status_id : (
                <Switch 
                defaultChecked={item.status.id === 3} 
                onChange={(checked) => onChange(checked, item.id)} />
            ),
            created_at : item.created_at,
            updated_at : item.updated_at,
            action: <div className='space-x-3'>
                        <EditAnnouncement announcement={item} fetchingData = {fetchingData}/>
                        <DeleteAnnouncement announcementId = {item.id} fetchingData = {fetchingData} />
                    </div> 
          
            
        }));
        // console.log(showData);
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
            title: 'Title',
            width: 200,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
        },
        {
            title: 'Post By',
            width: 150,
            dataIndex: 'admit_id',
            key: 'admit_id',
        },
        {
            title: 'Announcement ID',
            width: 120,
            dataIndex: 'reg_id',
            key: 'reg_id',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 180,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 150,
        },
        {
            title: 'Visibility',
            dataIndex: 'visibility',
            key: 'visibility',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'status_id',
            width: 150,
        },
        {
            title: 'Action',
            dataIndex : "action",
            key: 'action',
            fixed: 'right',
            width: 150,
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
                <div className='mb-2 flex gap-x-2'>
                    {contextHolder}
                    <AddAnnouncement fetchingData={fetchingData}/>
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
