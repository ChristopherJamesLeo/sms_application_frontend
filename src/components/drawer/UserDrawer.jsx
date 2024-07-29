import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined ,CheckCircleOutlined } from '@ant-design/icons';
import { Button , Divider , Switch , Col, DatePicker, Drawer, Form, Input, Row, Select, Space , Progress } from 'antd';

import Usertimeline from '../timeline/Usertimeline';

import UserDisable from '../models/UserDisable';
import UserPromote from '../models/UserPromote';
import UserVerify from '../models/UserVerify';
import UserPointManagement from './UserPointManagement';
import AttendedRecord from '../models/AttendedRecord';
import LeaveRecord from '../models/LeaveRecord';
import UserNote from '../models/UserNote';
import PointChangeRecord from '../models/AddPoints';


import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import axios, { Axios } from 'axios';

const { Option } = Select;

const conicColors = {
    '0%': '#ff0000',
    '50%': '#ffe58f',
    '100%': '#87d068',
  }

const getGrade = (percent) =>{
    if (percent > 0 && percent < 20){
        return "E";
    }else if(percent >= 20 && percent <= 40) {
        return "D";
    }else if (percent >= 40 && percent <= 60){
        return "C";
    }else if(percent >= 60 && percent <= 80) {
        return "B";
    }else if(percent >= 80 && percent <= 100) {
        return "A";
    };
}

const isVerify = (con , userid) => {
    if(con){
        return (
            <>
                <UserVerify userid={userid}/>
            </>
        )
    } else {
        return false;
    }
}

const isAdmin = (con , userid) => {
    if(con){
        return (
            <>
                    <div className="flex justify-evenly">
                        <UserPromote userid = {userid}/>
                        <UserDisable userid = {userid}/>
                        
                    </div>
            </>
        )
    } else {
        return false;
    }
}

const Userlistdrawer = ({name,userid}) => {

    const [condition, setCondition] = useState(true); 
    const [permission, setAdmin] = useState(true);

    const [open, setOpen] = useState(false);
    const [data , setData] = useState({});
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
        if(userid){
            let url = `https://jsonplaceholder.typicode.com/users/${userid}`;
            axios.get(url).then( response => {
                // console.log(response.data);
                setData(response.data);
                // console.log(data);
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
                width={1000}
                onClose={onClose}
                loading = {Boolean(isLoading)}
                open={open}
                styles={{
                body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                <Space >
                    <span className='block mr-3'>Verified { condition ? <CheckCircleOutlined className='text-green-700' /> : <CloseCircleOutlined className='text-red-700'/> }</span>
                    {lockfun(isLock)}
                    
                    <Switch disabled={disabled} defaultChecked />
                    
                </Space>
                }
            >
                <div className='drawer_content_container'>
                    {/* start user info */}
                    <div className="mb-3 flex justify-between">
                        
                        <ul className='' style={
                            {
                                width: "45%"
                            }
                        }>
                            <h3 className='text-lg mb-3 '>Personal Info</h3>
                            <li>Student ID -</li>
                            <li>Real Name -</li>
                            <li>NRC - </li>
                            <li>DOB -</li>
                            <li>Country -</li>
                            <li>City -</li>
                        </ul>
                        <ul className='' style={
                            {
                                width: "45%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Contact Info</h3>
                            <li>Address-</li>
                            <li>Phone -</li>
                            <li>Email -</li>
                            <li>Contact Detail -</li>
                            <li>Emergency Content -</li>
                            <li>Invitation Code -</li>
                        </ul>
                    </div>
                    {/* end user info */}

                    {/* start overall ratig */}
                    <div className='mb-3'>
                        <h3 className='text-lg'>Rating</h3>
                        <Progress percent={90} status="active" strokeColor={conicColors}/>
                    </div>
                    
                    {/* end overall rating */}

                    <Divider />

                    {/* start grade */}
                    <div className=" grade_container">
                        <h3 className="text-center text-2xl mb-3">Grade</h3>
                        <div className='flex justify-evenly'>
                            {/* assigment grade */}
                            <Progress type="dashboard" percent={90} strokeColor={conicColors} 
                                format={(percent)=>{
                                    return getGrade(percent);
                                }
                            } />
                            {/* Oberant grade */}
                            <Progress type="dashboard" percent={15.6} strokeColor={conicColors}   
                                format={(percent)=>{
                                    return getGrade(percent);
                                }
                            } />
                        </div>

                        {/* user records */}
                        <div className='my-5'>
                            <Space>

                                <AttendedRecord userid={userid}/>
                                <LeaveRecord userid={userid}/>
                                <PointChangeRecord userid={userid}/>
                                { isVerify( condition , userid) } {/* is user verify , insert (true) on parameter */}
                                
                            </Space>
                            
                        </div>
                        {/* user records */}


                    </div>
                    {/* end grade */}
                    <Divider/>
                    
                    <UserPointManagement />

                    <Divider/>

                    <div>
                        <h3 className="text-lg">Note <UserNote userid={userid}/></h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quibusdam laboriosam eaque, maxime distinctio error similique quasi quisquam non harum, pariatur praesentium. Nulla velit illo expedita blanditiis odit molestias soluta!
                        </p>
                    </div>
                    <Divider/>
                    {/* start Enrll */}
                    
                    
                    <div>
                        <h3 className='text-lg'>
                            Timeline
                        </h3>
                    </div>
                    <div className='flex justify-around flex-wrap'>
                        {/* */}
                        <div className='p-3'>
                            
                            <div className='flex justify-evenly'>
                                <Usertimeline />
                            </div>

                        </div>
                        
                    </div>
                    {/* end enroll */}

                    {/* start account deletion */}
                    { isAdmin(permission,userid) }
                    {/* end account deletion */}
                        


                    
                </div>

            </Drawer>
        </>
    );

};
export default Userlistdrawer;