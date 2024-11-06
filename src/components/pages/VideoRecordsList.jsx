
import React, { useEffect, useState , useMemo} from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Switch , Tooltip , Button} from 'antd';
import api from '../api/api';
import axios, { Axios } from 'axios';
import "./../CustomCss/tablestyle.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

import AddRecordVideo   from '../models/AddRecordVideo';
import EditRecordVideo,{DeleteRecordVideo} from '../models/EditRecordVideo';
import RecordVideoExport from '../export/RecordVideoExport';
import UserSearch from "../inputs/UserSearch";
import Coursedrawer from '../drawer/Coursedrawer';




export default function Videorecords({title}){
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
            const response = await api.put(`/videos/status/${idx}`, values, {
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

            const response = await api.get('/videos', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                updateDate(response.data.videos);
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
    // console.log(courses);

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



    
    // update data 
    function updateDate(videodata){
        // console.log(videodata);
        let data = videodata;
        let showData = data.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            course_id :  <Coursedrawer courseId = {item.course.id} name={item.course.name} />,
            video_link:  <Tooltip
                            placement="right"
                            title={<a onClick={()=>{
                                downLoadVideo(item.id)
                            }} >{item.link}</a>}
                            arrow={mergedArrow}>
                            <a onClick={()=>{
                                downLoadVideo(item.id)
                            }} target='blank'>{item.link.substring(0, 25)+"..."}</a>
                        </Tooltip>,
            date_time : item.datetime,
            remark : <div>
                <Tooltip
                    placement="right"
                    title={<div dangerouslySetInnerHTML={{ __html: item.remark }} />}
                    arrow={mergedArrow}>
                    <div dangerouslySetInnerHTML={{ __html: item.remark.substring(0,20)}} />
                </Tooltip>
            </div> ,
            count : item.count,
            admit_by : item.user.name,
            visibility : item.visibility.name,
            status_id : (
                <Switch 
                defaultChecked={item.status.id === 3} 
                onChange={(checked) => onChange(checked, item.id)} />
            ),
            action : <div className='space-x-3'>
                    <EditRecordVideo videoLink={item.link} videoDate={item.datetime} videoId = {item.id} videoRemark={item.remark} courseId = {item.course ? item.course.id : null} visibility_id = {item.visibility ? item.visibility.id : null} fetchingData={fetchingData} /> 
                    <DeleteRecordVideo videoId={item.id} fetchingData={fetchingData}/>
                </div>
        }));
        setLoading(false)
        setfetchData(showData);
    }

    // console.log(courses);

    // end update data


    // start bulk delete
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    async function bulkdelete(){
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        try {
            // console.log("hello");

            const response = await api.post('/video/bulkdelete',selectedRowKeys ,{
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                fetchingData();
                setSelectedRowKeys([]);
                success(response.data.message);
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
    }
    // end bulk delete

    // download video
    async function downLoadVideo(id){
        console.log('downLoadVideo', id);
        try {
            // console.log("hello");

            const response = await api.get(`/videos/download/${id}`,{
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });

            if (response.data) {

                success(response.data.message);
                console.log(response.data);
                console.log(response.data.link);
                window.open(response.data.link, '_blank');
                fetchingData()
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
    }
    // end download video


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
            title: 'Course Id',
            width: 200,
            dataIndex: 'course_id',
            key: 'course_id',
            fixed: 'left',
        },
        {
            title: 'Link',
            width: 250,
            dataIndex: 'video_link',
            key: 'video_link',
        },{
            title: 'Date & Time',
            width: 250,
            dataIndex: 'date_time',
            key: 'date_time',
        },{
            title: 'Remark',
            width: 250,
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: 'Download Count',
            dataIndex: 'count',
            key: 'count',
            width: 180,
        },
        {
            title: 'Admit By',
            dataIndex: 'admit_by',
            key: 'admit_by',
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
            title: "Action",
            dataIndex : "action",
            key : "action",
            width : 200,
        }
    ];

    let tableWidth = 0 ;
    
    columns.forEach(function(column){
        tableWidth += column.width;
    })


    return (
        <div className="table-container">
            <h2 className='table_title'>{title}</h2>
            {contextHolder}
            <div className="my-4 ">
                <div className='mb-3 flex gap-x-2'>
                    <AddRecordVideo courses={courses} fetchingData={fetchingData}/>
                </div>
                <div className='flex justify-end'>
                    {/*start bulk delete*/}
                    <Button type="primary" onClick={bulkdelete}  disabled={!hasSelected} >
                        Bulk Delete
                    </Button>
                    {/*{hasSelected ? `Selected ${selectedRowKeys.length} items` : null}*/}
                    {/*end bulk delete*/}
                    <RecordVideoExport courses={courses} updateData = {updateDate}/>
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                bordered
                dataSource={data}
                columns={columns}
                loading={isLoading}
                pagination={false}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};

