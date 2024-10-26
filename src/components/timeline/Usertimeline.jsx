
import { Link } from 'react-router-dom';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import Coursedrawer from '../drawer/Coursedrawer';
export default function Usertimeline({userEnrolls}){
    console.log( "hello ", userEnrolls);


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
                                    <span>{userEnroll.created_at}</span><br />
                                    <span>{userEnroll.category.name}</span><br />
                                    <span>
                                        <Coursedrawer courseId = {userEnroll.course.id} name={userEnroll.course.name} />
                                    </span><br />
                                    <span>
                                        {Math.round(( userEnroll.attendances / userEnroll.leadAttendances ) * 100) + " %"}
                                    </span>
                                    <p >
                                        {userEnroll.remark}
                                    </p>
                                    <p className='font-bold'>Stage - {userEnroll.stage.name}</p>
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
               