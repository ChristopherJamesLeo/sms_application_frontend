import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button , Divider , Switch , Image , Col, DatePicker, Drawer, Form, Input, Row, Select, Space , Progress } from 'antd';
import Usertimeline from '../timeline/Usertimeline';
import Userdeletemodel from '../models/UserDisable';
import Userpromotemodel from '../models/UserPromote';
import Userlistdrawer from './UserDrawer';
import Postcomments from './Postcommets';
import EnrollDrawer from './EnrollDrawer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {
    ClockCircleOutlined,
    LockOutlined,
    UnlockOutlined
  } from '@ant-design/icons';
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


const Coursedrawer = ({days,coursedata,name}) => {

    // console.log(coursedata,days)
    if(!coursedata && !days){
        return false;
    }

    var trainerName = coursedata.trainer.name;
    var trainerId = coursedata.trainer.id;

    
    const [open, setOpen] = useState(false);
    const [data , setData] = useState({});
    const [isLoading , setloading] = useState(false);

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

    function classType(typeId){
        if(typeId === 1){
            return (
                <ul className='ml-4'>
                    <li className='my-2'>Zoom Id - {`${coursedata.courseContact.zoomId }`}</li>
                    <li className='my-2'>Passcode- {`${coursedata.courseContact.passcode}`}</li>
                    <li className='my-2'>Video Count- {`${coursedata.courseContact.videoCount}`}</li>
                </ul>
            )
        }else if(typeId === 2){
            return (
                <ul className='ml-4'>
                    <li className='my-2'>Address - {`${coursedata.courseContact.address}`}</li>
                    <li className='my-2'>Room No-  {`${coursedata.courseContact.roomNo}`}</li>
                    <li className='my-2'>Location.-  {`${coursedata.courseContact.googleMap}`}</li>
                </ul>
            )
        }
    }



    const toggle = () => {
      setDisabled(!disabled);
      setLock(false);
    };


    const showDrawer = () => {
        setOpen(true);
        
    };

    const onClose = () => {
        setOpen(false);
    };

    // let getDays =  days.map(function(day,idx){
    //     for (const key in day) {
    //         // console.log(day.name);
    //         // console.log(day.id);

    //         for(const coursedaykey in coursedata.courseDays){
    //             let courseDayId = coursedata.courseDays[coursedaykey].day_id;
    //             if(day.id == courseDayId){
    //                 // console.log(day.name);
    //                 return day.name;
    //             }
                
    //         }
    //     }
    
    // })
    // console.log(getDays);
    let getDays = [];
    days.forEach(function(day,idx){
        // console.log(day.name);
        for(let i = 0 ; i < coursedata.courseDays.length; i++){
            // console.log(coursedata.courseDays[i].id)
            if(day.id == coursedata.courseDays[i].day_id){
                getDays.push(day.name);
            }
        }
        
    })

    console.log(getDays);

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
                title={`Name : ${ name ? name : "Loading..."}`}
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
                <Space>
                    {lockfun(isLock)}
                    
                    <Switch disabled={disabled} defaultChecked />
                    
                </Space>
                }
            >
                <div className='drawer_content_container'>
                    <div className='w-100 h-54 poster_container'>
                        <Image
                            width={"100%"}
                            height={"200px"}
                            style={
                                {
                                    objectFit: "cover"
                                }
                            }
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    {/* start Course info */}
                    <ul className="mb-4 flex gap-x-3">
                        <li>Course View - 1</li>
                        <li>Like - 2 </li>
                        <li><EnrollDrawer postId={3} name={"Enrolls"}/>  - 3 </li>
                        <li><Postcomments postId={2} name={"Comments"}/> - 3 </li>
                    </ul>
                        
                    <div className="mb-3 flex justify-between">
                        
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3 '>Course Info</h3>
                            <li className='my-2'>Trainer -  <Userlistdrawer coursedata={coursedata} name={trainerName} userid = {trainerId} /></li>
                            <li className='my-2'>
                                <div>Type - {coursedata.courseType.name }</div>
                                {
                                    classType(coursedata.courseType.id)
                                }
                            </li>

                            <li className='my-2'>Fee - {coursedata.fee } MMK </li>
                            
                        </ul>
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Class Schedule</h3>
                            <li className='my-2'>Categories - { coursedata.category.name}</li>
                            <li className='my-2'>Title - {coursedata.name}</li>
                            <li className='my-2'>Start Date - {coursedata.startdate}</li>
                            <li className='my-2'>End Date - { coursedata.enddate}</li>
                            
                            <li className='my-2'>Time - {coursedata.starttime } to {coursedata.endtime }</li>
                        </ul>
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Point Management</h3>
                            <li className='my-2'>Point - { coursedata.paymentPoint} </li>
                            <li className='my-2'>Bonous - {coursedata.bonousPoint} </li>
                            <li className='my-2'>Attended Point- {coursedata.attendedPoint} </li>
                            <li className='my-2'>Leave Point - { coursedata.leavePoint} </li>
                        </ul>
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Days</h3>
                                {
                                    getDays.map(function(getDay){
                                        return (
                                            <>
                                                <li className='my-2'>{getDay} &nbsp;</li>
                                            </>
                                        )
                                    })
                                }
                        </ul>


                        
                    </div>
                    {/* end Course info */}
                    <hr className='my-2'/>
                    {/* start Syllabus */}
                    <div>

                        <h3 className="text-lg">Learning Objective</h3>
                        <div>
                            <ReactQuill value={coursedata.syllabus.syllaby} readOnly={true} theme="bubble" />
                        </div>
                    </div>
                    
                    {/* end Syllabus*/}

                    {/* start Enrll */}



                    
                </div>

            </Drawer>
        </>
    );

};
export default Coursedrawer;