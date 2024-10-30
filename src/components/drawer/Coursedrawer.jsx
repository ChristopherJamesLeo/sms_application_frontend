import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button  , Switch , Image , Col, Drawer, Form, Input, Row, Select, Space , message , ConfigProvider , Modal} from 'antd';
import api from '../api/api';
import Usertimeline from '../timeline/Usertimeline';
import Userdeletemodel from '../models/UserDisable';
import Userpromotemodel from '../models/UserPromote';
import { ChangeVisibility } from '../models/EditCourse';
import Userlistdrawer from './UserDrawer';
import Postcomments from './Postcommets';
import EnrollDrawer from './EnrollDrawer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {
    ClockCircleOutlined,
    LockOutlined,
    UnlockOutlined,
    GlobalOutlined
  } from '@ant-design/icons';
import axios, { Axios } from 'axios';
import TextArea from 'antd/es/input/TextArea';
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


const Coursedrawer = ({fetchData,courseId, name}) => {

    // console.log(coursedata,days)
    // console.log(courseId);
    
    var [open, setOpen] = useState(false);
    var [isLoading , setloading] = useState(true);
    var [days,setDays] = useState([]);
    var [enrollCount,setEnrollCount] = useState(0);
    var [coursedata,setCourseData] = useState({});



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

    function classType(typeId){
        if(typeId === 1){
            return (
                <ul className='ml-4'>
                    <li className='my-2'>Zoom Id - {`${coursedata.courseContact ? coursedata.courseContact.zoomId : null}`}</li>
                    <li className='my-2'>Passcode- {`${coursedata.courseContact ? coursedata.courseContact.passcode : null}`}</li>
                    <li className='my-2'>Video Count- {`${coursedata.courseContact ? coursedata.courseContact.videoCount : null}`}</li>
                </ul>
            )
        }else if(typeId === 2){
            return (
                <ul className='ml-4'>
                    <li className='my-2'>Address - {`${coursedata.courseContact ? coursedata.courseContact.address : null}`}</li>
                    <li className='my-2'>Room No-  {`${coursedata.courseContact ? coursedata.courseContact.roomNo : null}`}</li>
                    <li className='my-2'>Location.-  {`${coursedata.courseContact ? coursedata.courseContact.googleMap : null}`}</li>
                </ul>
            )
        }
    }



    const toggle = () => {
      setDisabled(!disabled);
      setLock(false);
    };

    // start fetch single Data 
    async function fetchingData(id){
        let getCourseId = id;
        try {
            // console.log(getCourseId);
            const response = await api.get(`/courses/${getCourseId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            // console.log(response)
            if (response.data) {
                
                console.log(response.data)
                let data = response.data;
                setCourseData(data.course);
                setDays(data.days);
                setEnrollCount(data.enrollCount)
                setloading(false)
                
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
            setloading(false);
        }
    }
    // end fetch single data


    // start active switch
    const onChange = async (checked, idx) => {
        console.log(idx);
        let statusId = checked ? 3 : 4; 
        // console.log("status id is", statusId);
        
        let values = {
            "id": idx,
            "status_id": statusId
        };

        console.log(values);
        
        try {
            const response = await api.put(`/courses/status/${idx}`, values, {
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
            } else {
                error("Error in setting up request.");
            }
        } finally {
            setloading(false);
        }
    };
    // end active switch

    // start day status
    const dayStatusChange = async (checked, idx) => {
        console.log(idx);
        let statusId = checked ? 3 : 4;
        // console.log("status id is", statusId);

        let values = {
            "id": idx,
            "status_id": statusId
        };

        console.log(values);

        try {
            const response = await api.put(`/courses/day/status/${idx}`, values, {
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
            } else {
                error("Error in setting up request.");
            }
        } finally {
            setloading(false);
        }
    };
    // end day status

    const showDrawer = () => {
        setOpen(true);
        fetchingData(courseId);

        
        
    };

    const onClose = () => {
        setOpen(false);
    };

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
                   
                    {
                        coursedata.status ?  <Switch disabled={disabled} defaultChecked={coursedata.status.id === 3} 
                        onChange={(checked) => onChange(checked, coursedata.id)}  /> : "loading..."
                    }
                    
                </Space>
                }
            >
                {contextHolder}
                <div className='drawer_content_container'>
                    <div className='w-100 h-54 poster_container'>
                        <Image
                            width={"100%"}
                            height={"300px"}
                            style={
                                {
                                    objectFit: "cover",
                                }
                            }
                            public_id = {`${coursedata.public_id}`}
                            src={`${coursedata.image}`}
                        />
                    </div>
                    {/* start Course info */}
                    <ul className="mb-4 flex gap-x-3">
                        {/*<li>Course View - 1</li> |*/}
                        <li>Download Video Count - {coursedata.totalVideoDownloadCount} </li> |
                        <li><EnrollDrawer postId={coursedata? coursedata.id : null} name={"Enrolls"}/>  - {enrollCount} </li> |
                        <li><Postcomments postId={2} name={"Comments"}/> - 3 </li> |
                        <li><GlobalOutlined /> <ChangeVisibility 
                        visibility={coursedata.visibility ? coursedata.visibility.name : false} 
                        visibilityId = {coursedata.visibility ? coursedata.visibility.id : false}
                        courseId = {coursedata.id}
                        fetchData = {fetchingData} 
                        fetchAllData = {fetchData}
                         /> </li>
                        
                    </ul>
                    {/* <CommentBox coursedata = {coursedata}/> */}
                        
                    <div className="mb-3 flex justify-between">
                        
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3 '>Course Info</h3>
                            <li className='my-2'>Trainer -  <Userlistdrawer coursedata={coursedata} name={coursedata.trainer?coursedata.trainer.name : null} userid = {coursedata.trainer?coursedata.trainer.id : null} /></li>
                            <li className='my-2'>
                                <div>Type - {coursedata.courseType ? coursedata.courseType.name : null }</div>
                                {
                                    classType(coursedata.courseType? coursedata.courseType.id : null)
                                }
                            </li>

                            <li className='my-2'>Fee - {coursedata ? coursedata.fee : null } MMK </li>
                            
                        </ul>
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Class Schedule</h3>
                            <li className='my-2'>Categories - { coursedata.category ? coursedata.category.name : null}</li>
                            <li className='my-2'>Title - {coursedata ? coursedata.name : null}</li>
                            <li className='my-2'>Start Date - {coursedata ? coursedata.startdate : null}</li>
                            <li className='my-2'>End Date - { coursedata ? coursedata.enddate : null}</li>
                            
                            <li className='my-2'>Time - {coursedata ? coursedata.starttime : null } to {coursedata ? coursedata.endtime : null }</li>
                        </ul>
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Point Management</h3>
                            <li className='my-2'>Point - { coursedata ? coursedata.paymentPoint : null} </li>
                            <li className='my-2'>Bonous - {coursedata ? coursedata.bonousPoint : null} </li>
                            <li className='my-2'>Attended Point- {coursedata ? coursedata.attendedPoint : null} </li>
                            <li className='my-2'>Leave Point - { coursedata ? coursedata.leavePoint : null} </li>
                            <li className='my-2'>Video Point - { coursedata.courseContact ? coursedata.courseContact.videoPoint : null} </li>
                        </ul>
                        <ul className='' style={
                            {
                                width: "25%"
                            }
                        }>
                            <h3 className='text-lg mb-3'>Days</h3>
                                {
                                    // console.log(
                                        
                                    // )
                                    getDays.map(function(getDay,idx){
                                        // return coursedata.courseDays[idx].day_id;
                                        return (
                                            <>
                                                <li className='my-2 flex justify-between'>

                                                    <span key={idx+1}>{getDay} </span>
                                                    <Switch
                                                        key={idx+1}
                                                    size='small'
                                                    defaultChecked={coursedata.courseDays[idx].status_id === 3} 
                                                    onChange={(checked) => dayStatusChange(checked, coursedata.courseDays[idx].id)} />
                                                </li>
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
                            <ReactQuill value={coursedata.syllabus ? coursedata.syllabus.syllaby : null} readOnly={true} theme="bubble" />
                        </div>
                    </div>
                    
                    {/* end Syllabus*/}

                    {/* start Enrll */}

                    
                </div>

            </Drawer>
        </>
    );

};


const CommentBox = ({coursedata})=> {
    if(!coursedata){
        return false;
    }

    console.log(coursedata);

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();


    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();


    const formHandler = async (values) => {
        values.commentable_id =coursedata.id;

        try {
            console.log(values);
            // const response = await api.post('/categories', values, {
            //     headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            // });
            // if (response.data) {
            //     if (response.data) {
            //         form.resetFields();
            //         setOpen(false);
                    
            //         success(response.data.message);
            //         fetchData();
            //     }
            // } else {
            //     error("Edit failed.");
            // }
    
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

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Button type="primary" onClick={() => setOpen(true)} style={
                    {
                        marginBottom: "15px"
                    }
                }>Add Comment</Button>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Add Stage"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark onFinish={formHandler} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="comment"
                                label="Comment"
                                rules={[{ required: true, message: 'Please enter Comment' }]}
                            >
                                <TextArea placeholder="Please enter categories" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>

                        <Button type="primary" htmlType="button" onClick={formConfirm}>Submit</Button>
                        <Button htmlType="button" onClick={onReset}>Reset</Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}



export default Coursedrawer;