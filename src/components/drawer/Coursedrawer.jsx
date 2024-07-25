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

function classType(typeId){
    if(typeId === 1){
        return (
            <ul className='ml-4'>
                <li className='my-2'>Zoom Id - 1235 3122</li>
                <li className='my-2'>Passcode- American</li>
            </ul>
        )
    }else if(typeId === 2){
        return (
            <ul className='ml-4'>
                <li className='my-2'>Address - 1235 3122</li>
                <li className='my-2'>Room No- 310C</li>
                <li className='my-2'>Location.- Lat- 12864827, Lgn - 2837283</li>
            </ul>
        )
    }
}

function paymentType(typeId,paymentType){
    if(typeId === 1){
        return (
           <span>{paymentType}</span>
        )
    }else if(typeId === 2){
        return (
            <span>{paymentType}</span>
         )
    }
}
const Coursedrawer = ({name,postid}) => {

    
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
        if(postid){
            let url = `https://jsonplaceholder.typicode.com/users/${postid}`;
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
                                width: "45%"
                            }
                        }>
                            <h3 className='text-lg mb-3 '>Course Info</h3>
                            <li className='my-2'>Trainer -  <Userlistdrawer name={"Trainer Name"} userid = {1} /></li>
                            <li className='my-2'>
                                <div>Type - Online / Offline</div>
                                {
                                    classType(2)
                                }
                            </li>

                            <li className='my-2'>Fee - 30000 MMK  - { paymentType(1,"Mobile Banking") } </li>
                            
                        </ul>
                        <ul className='' style={
                            {
                                width: "45%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Class Schedule</h3>
                            <li className='my-2'>Categories - Web Development</li>
                            <li className='my-2'>Title - Web Developemnt Batch 1</li>
                            <li className='my-2'>Start Date -</li>
                            <li className='my-2'>End Date -</li>
                            <li className='my-2'>Days-</li>
                            <li className='my-2'>Time -</li>
                        </ul>
                    </div>
                    {/* end Course info */}
                    <hr className='my-2'/>
                    {/* start Syllabus */}
                    <div>
                        <h3 className="text-lg">Topic</h3>
                        <span>Current Topic</span>

                        <hr className='my-2'/>

                        <h3 className="text-lg">Learning Objective</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque eligendi est saepe ad, perferendis impedit soluta doloremque possimus rem laboriosam nihil fugiat deserunt, voluptatum cum magnam iste odio quas.
                        </p>
                        <hr className='my-2'/>

                        <h3 className='text-lg'>Outline</h3>
                        <ul>
                            <li>Outline 1</li>
                            <li>Outline 2</li>
                            <li>Outline 3</li>
                            <li>Outline 4</li>
                        </ul>

                    </div>
                    
                    {/* end Syllabus*/}

                    <Divider/>
                    <div>
                        <h3 className="text-lg">Note </h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quibusdam laboriosam eaque, maxime distinctio error similique quasi quisquam non harum, pariatur praesentium. Nulla velit illo expedita blanditiis odit molestias soluta!
                        </p>
                    </div>
                    <Divider/>
                    {/* start Enrll */}
                    

                    {/* start account deletion */}
                    <div className="flex justify-evenly">
                        {/* <Button type="primary">Promote</Button> */}
                        <Userpromotemodel/>
                        <Userdeletemodel/>
                        
                    </div>
                    {/* end account deletion */}



                    
                </div>

            </Drawer>
        </>
    );

};
export default Coursedrawer;