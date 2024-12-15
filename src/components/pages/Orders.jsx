
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table , message , Tag , Switch} from 'antd';
import "./../CustomCss/tablestyle.css";
import AddPackageOrder from '../models/AddPackageOrder';
import UserSearch from "../inputs/UserSearch";
import api from '../api/api';

import Userlistdrawer from '../drawer/UserDrawer';
import UserExport from '../export/UserExport';

export default function Orders({title}){
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


            const response = await api.get('/packageorders', {
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
    function updateDate(orderData){
        console.log(orderData);
        let showData = orderData.map((item, index) => ({
            key: item.id,
            no: index + 1,
            id: item.id,
            user_id :  <Userlistdrawer userid = {item.user.id}  name={item.user.regnumber} />, 
            transaction_id: item.transaction_id,
            packagename : item.package.name,
            point : item.package.point,
            stage : item.stage.name,
            image : item.image,
            remark : item.description,
            admit_by :  item.admit ? item.admit.name : null,
            created_at : item.created_at,
            updated_at : item.updated_at
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
            title: 'Student Id',
            width: 200,
            dataIndex: 'user_id',
            key: 'user_id',
            fixed: 'left',
        },{
            title: 'Transaction ID',
            width: 200,
            dataIndex: 'transaction_id',
            key: 'transaction_id'
        },{
            title: 'Package',
            width: 200,
            dataIndex: 'packagename',
            key: 'packagename'
        },
        {
            title: 'Point',
            width: 250,
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Stage',
            dataIndex: 'stage',
            key: 'stage',
            width: 150,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 150,
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark',
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
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 200,
        }
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
                <div className='mb-3 flex gap-x-2'>
                    <AddPackageOrder fetchData = {fetchingData}/>
                </div>
                <div className='flex justify-end'>
                    <UserSearch/>
                    <UserExport/>
                </div>
            </div>

            <Table
                bordered
                dataSource={data}
                columns={columns}
                loading={Boolean(isLoading)}
                pagination={{ pageSize: 10 }}
                scroll={{ x: {tableWidth} , y : "68vh" }}
            />
        </div>
    );
};
