import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch , Drawer, Space } from 'antd';

import {
    LockOutlined,
    UnlockOutlined
  } from '@ant-design/icons';
import axios, { Axios } from 'axios';

import Userlistdrawer from '../userManagement/user/UserDrawer';


const Postcomments = ({name,postId}) => {

    
    const [open, setOpen] = useState(false);
    const [data , setData] = useState([]);
    const [isLoading , setloading] = useState(true);

    const [disabled, setDisabled] = useState(true);
    const [ isLock , setLock] = useState(true);

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


    const showDrawer = () => {
        setOpen(true);
        // console.log(userid);
        if(postId){
            let url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
            axios.get(url).then( response => {
                // console.log(response.data);
                setData(response.data);
                console.log(data);
                setloading(false);
            }).catch(function(response){
                console.log("error occur",response.data);
            })
        }
        
    };

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
                title={`Name : ${data.name ? data.name : "Loading..."}`}
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
                    {
                        
                        data.map(function(data){
                            return(
                                <>
                                    <li >
                                        <p>{data.body}</p>
                                        <div className='text-end'>
                                            <span className='text-gray-400'> <Userlistdrawer name={data.name} userid={data.id}/> </span>
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
export default Postcomments;