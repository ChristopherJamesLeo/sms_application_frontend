
import {message, Tag, Timeline} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import Coursedrawer from '../courses/Coursedrawer.jsx';
import React from "react";
import api from "../api/api.jsx";
export default function Usertimeline({userEnrolls}){
    console.log( "hello ", userEnrolls);


    const [messageApi, contextHolder] = message.useMessage();

    var success = (msg) => messageApi.open({ type: 'success', content: msg });
    var error = (msg) => messageApi.open({ type: 'error', content: msg });


    return (
        <Timeline
            mode="alternate"
            style={
                {
                    width : "900px"
                }
            }
            items={
                userEnrolls.map(function(userEnroll){
                    console.log(userEnroll);
                    let enrollarr=  {
                        children: ( 
                            <>
                                <div className='block'>
                                    {contextHolder}
                                    <span>{userEnroll.created_at}</span><br/>
                                    <span>{userEnroll.category.name}</span><br/>
                                    <span>
                                        <Coursedrawer courseId={userEnroll.course.id} name={userEnroll.course.name}/>
                                    </span><br/>
                                    <span>
                                        {Math.round((userEnroll.attendances / userEnroll.leadAttendances) * 100) + " %"}
                                    </span>
                                    <p>
                                        {userEnroll.remark}
                                    </p>
                                    <p className='font-bold mb-1'>Stage - {userEnroll.stage.name}  </p>
                                    <p className=''>Permission - <Tag color={`${userEnroll.status.id == 3 ? "green" : "red" }`}> {userEnroll.status.name} </Tag></p>
                                </div>

                            </>
                        ),
                    }

                    if(userEnroll.stage.id === 1){
                        enrollarr.color = "green";
                    }else if(userEnroll.stage.id === 2){
                        enrollarr.dot = (
                            <ClockCircleOutlined
                                style={{
                                fontSize: '16px',
                                }}
                            />
                        );
                    }else if(userEnroll.stage.id === 3){
                        enrollarr.color = "red";
                    }
            
                    return enrollarr;
                })

            }
        />
    )
  

}
               