import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined ,CheckCircleOutlined } from '@ant-design/icons';
import { Divider , Switch , Col, DatePicker, Drawer, Form, Input, Row, Select, Space , Progress , message} from 'antd';
import api from '../api/api';
import Usertimeline from '../timeline/Usertimeline';

import UserDisable from '../models/UserDisable';
import UserPromote from '../models/UserPromote';
import UserVerify from '../models/UserVerify';
import {ViewVerification} from '../models/UserManualVerification';

import UserPointManagement from './UserPointManagement';
import AttendedRecord from '../models/AttendedRecord';
import LeaveRecord from '../models/LeaveRecord';
import UserNote from '../models/UserNote';
import PointChangeRecord from '../models/PointChangeRecord.jsx';



import { LockOutlined, UnlockOutlined } from '@ant-design/icons';


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
    if(con == 1 || con == 2 || con == 3){
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

const Userlistdrawer = ({fetchData,name,userid}) => {

    // console.log(name,userid);
    var [condition, setCondition] = useState(true); 
    var [permission, setAdmin] = useState(true);

    var [open, setOpen] = useState(false);
    var [data , setData] = useState({});
    var [isLoading , setloading] = useState(true);

    var [userEnrolls, setUserEnrolls] = useState([]);
    var [role,setRole] = useState({});

    var [disabled, setDisabled] = useState(true);
    var [ isLock , setLock] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

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
        let statusId = checked ? 12 : 13; 
        // console.log("status id is", statusId);
        
        let values = {
            "id": idx,
            "status_id": statusId
        };

        console.log(values);
        
        try {
            const response = await api.put(`/users/status/${idx}`, values, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                fetchData()
                success("User Change Status Successful");

            } else {
                error("User Change Status failed.");
            }
    
        } catch (err) {
            if (err.response) {
                error(err.response.status === 404 ? "Resource not found (404)." : `Error: ${err.response.status}`);
            } else if (err.request) {
                error("No response received from server.");
            }
        } finally {
            setloading(false);
        }
    };
    // end active switch

    const formHandler = async (id) => {
        try {
            const response = await api.get(`/users/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    // console.log(response.data.data);
                    const data = response.data;
                    // console.log(data.user);
                    console.log(response.data);
                    setData(data);
                    setDisabled(data.status_id === 12 ? false : true)
                    setUserEnrolls(data.enrolls)
                    setRole(data.role);
                    isAdmin(data.user.role_id);
                    setCondition(data.user.is_verify);
                    setloading(false);
                }
            } else {
                error("Edit failed.");
            }
    
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    error("Resource not found (404).");
                } else {
                    error(`Error: ${err.response.status}`);
                }
            } else if (err.request) {
                error("No response received from server.");
            } else {
                error("Error in setting up request.");
            }
        }
    };
    // console.log(data);

    // start rating
    function ratingFun(){
        let attendant= 0;
        let leadAttendant = 0;
        userEnrolls.forEach(function (enroll,idx){
            attendant += enroll.attendances;
            leadAttendant += enroll.leadAttendances;

        })
        return  Math.round(( attendant / leadAttendant ) * 100 );

    }

    // end rating

    // start role
    function rating (){
        if(role.id == 5 || role.id == 6){
            return (
                <>
                    <div className='mb-3'>
                        <h3 className='text-lg'>Rating</h3>
                        <Progress percent={ratingFun()} status="active" strokeColor={conicColors}/>
                    </div>
                </>
            )
        }
    }

    // end role

    // console.log(userEnrolls)
    const showDrawer = () => {
        setOpen(true);
        formHandler(userid)

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
                title={`Name : ${data.user ? data.user.name : "Loading..."}`}
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
                    <span className='block mr-3'>Verified { condition ? <CheckCircleOutlined className='text-green-700'  /> : <CloseCircleOutlined className='text-red-700'/> }</span>
                    {lockfun(isLock)}
                    {
                        data.user ?  <Switch disabled={disabled} defaultChecked={data.user.status.id == 12}
                        onChange={(checked) => onChange(checked, data.user.id)}  /> : "loading"
                    }
                </Space>
                }
            >
                {contextHolder}
                <div className='drawer_content_container'>
                    {/* start user info */}
                    <div className="mb-3 flex justify-between">
                        
                        <ul className='' style={
                            {
                                width: "45%"
                            }
                        }>
                            <h3 className='text-lg mb-3 '>Personal Info</h3>
                            <li>{`Student Id : ${data.user ? data.user.regnumber : "---"}`}</li>
                            <li>{`Real Name : ${data.user &&  data.user.verification ? data.user.verification.realname : "---"}`}</li>
                            <li>{`NRC : ${data.user &&  data.user.verification ? data.user.verification.card_number  : "---"}`} </li>
                            <li>{`Gender : ${data.gender ? data.gender.name : "---"}`}</li>
                            <li>{`Country : ${data.country ? data.country.name : "---"}`}</li>
                            <li>{`City: ${data.city ? data.city.name : "---"}`}</li>
                        </ul>
                        <ul className='' style={
                            {
                                width: "45%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Contact Info</h3>
                            <li>{`Email : ${data.user ? data.user.email : "Loading..."}`}</li>
                            <li>{`Phone : ${data.user ? data.user.phone : "Loading..."}`}</li>
                            <li>{`Contact Detail : ${data.user ? data.user.phone : "Loading..."}`} </li>
                            <li>{`Emergency Content : ${data.user ? data.user.emergency_number : "Loading..."}`}</li>
                        </ul>
                    </div>
                    {/* end user info */}

                    {/* start overall ratig */}

                    {rating()}
                    
                    {/* end overall rating */}

                    <Divider />

                    {/* start grade */}
                    <div className=" grade_container">
                        {/*<h3 className="text-center text-2xl mb-3">Grade</h3>*/}
                        {/*<div className='flex justify-evenly'>*/}
                        {/*    /!* assigment grade *!/*/}
                        {/*    <Progress type="dashboard" percent={90} strokeColor={conicColors} */}
                        {/*        format={(percent)=>{*/}
                        {/*            return getGrade(percent);*/}
                        {/*        }*/}
                        {/*    } />*/}
                        {/*    /!* Oberant grade *!/*/}
                        {/*    <Progress type="dashboard" percent={15.6} strokeColor={conicColors}   */}
                        {/*        format={(percent)=>{*/}
                        {/*            return getGrade(percent);*/}
                        {/*        }*/}
                        {/*    } />*/}
                        {/*</div>*/}

                        {/* user records */}
                        <div className='my-5'>
                            <Space>

                                <AttendedRecord userid={userid}/>
                                <LeaveRecord userid={userid}/>
                                <ViewVerification userId={userid} title="Verification Details"  size="middle"  />
                                <PointChangeRecord  userid={userid} />
                                
                            </Space>
                            
                        </div>
                        {/* user records */}


                    </div>
                    {/* end grade */}
                    <Divider/>
                    
                    <UserPointManagement userdata = {data} userid = {userid} formHandler = {formHandler}/>

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
                                <Usertimeline userEnrolls = {userEnrolls ? userEnrolls : false} />
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