import React, { useState } from 'react';
import {Switch, Drawer, Space, message , Tag} from 'antd';

import {
    LockOutlined,
    UnlockOutlined
  } from '@ant-design/icons';

import Userlistdrawer from './UserDrawer';
import api from "../api/api.jsx";


const EnrollDrawer = ({name,postId}) => {

    
    const [open, setOpen] = useState(false);
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);

    const [disabled, setDisabled] = useState(true);
    const [ isLock , setLock] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });

    function hadleLock(){
        toggle();
        setLock(true);
    }

    function lockfun  (bool) {
        if(bool){
            return (
                <>
                    <LockOutlined onClick={toggle}/>
                    
                </>
            )
        }else {
            return (
                <>
                    <UnlockOutlined onClick={hadleLock } />
                </>
            )
        }
    }


    const toggle = () => {
      setDisabled(!disabled);
      setLock(false);
    };

    // start active switch
    const onChange = async (checked, idx) => {
        // console.log(idx);
        let statusId = checked ? 3 : 4;
        // console.log("status id is", statusId);

        let values = {
            id: idx,
            status_id: statusId
        };

        console.log(values);

        try {
            const response = await api.put(`/enroll/user/status/${idx}`, values, {
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



    const showDrawer = async () => {
        setOpen(true);
        console.log(postId);

        try {
            // console.log("hello");

            const response = await api.get(`/enroll/course/user/${postId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            console.log(response.data)
            if (response.data) {
                setData(response.data)

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


    function updateDate(userdata){

        let showData = data.map((item, index) => ({

        }));
        setLoading(false)
    }

    const onClose = () => {
        setOpen(false);
    };
    return (

        <>
            
            <span onClick={showDrawer} style={
                                                {
                                                    color: "blue",
                                                    cursor : "pointer"
                                                }
                                            }>{name}</span>
            <Drawer
                // title={`Name : ${data.address ? data.address.street : "Loading..."}`}
                title={`Enroll List`}
                width={720}
                onClose={onClose}
                loading = {Boolean(isLoading)}
                open={open}
                styles={{
                body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                <Space>
                    {lockfun(isLock)}
                    
                    <Switch disabled={disabled} defaultChecked />
                    
                </Space>
                }
            >   
                <ul>
                    {contextHolder}
                    {
                        
                        data.map(function(data){
                            return(
                                <>
                                    <li >
                                        <div className='flex justify-between'>
                                            <span>
                                                <Userlistdrawer name={data.user.regnumber} userid={data.user.id} />
                                            </span>
                                            <div>
                                                <Tag  color="default">{data.stage.name}</Tag>
                                                <span>
                                                    <Switch
                                                    defaultChecked={data.status.id === 3}
                                                    checkedChildren={"Enable"}
                                                    unCheckedChildren={"Disable"}
                                                    onChange={(checked) => onChange(checked, data.id)} />
                                            </span>
                                            </div>

                                        </div>
                                        <div className='text-end mt-2'>
                                            <span>{data.created_at} </span>
                                        </div>
                                        
                                    </li>
                                    <hr className='my-2'/>
                                </>
                                
                            )
                        })
                    }
                </ul>
               

            </Drawer>
        </>
    );

};
export default EnrollDrawer;