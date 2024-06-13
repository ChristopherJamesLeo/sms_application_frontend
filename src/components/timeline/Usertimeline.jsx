
import { Link } from 'react-router-dom';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import Coursedrawer from '../drawer/Coursedrawer';
export default function Usertimeline(){
    return (
        <Timeline
            mode="alternate"
            
            items={
                [
                    {
                        color: 'green',
                        children: ( 
                            <>
                                <p>Web development foundation</p>
                                <p>
                                    <Coursedrawer name={"Course 3"} postid={1}/>
                                </p>
                                <p>Attendance 90 %</p>
                                <p className='font-bold'>Status - Success</p>
                            </>
                        ),
                    },
                    
                    {
                        dot: (
                        <ClockCircleOutlined
                            style={{
                            fontSize: '16px',
                            }}
                        />
                        ),
                        
                        children: ( 
                            <>
                                <p>Web development foundation</p>
                                <p>
                                    <Coursedrawer name={"Course 2"} postid={1}/>
                                </p>
                                <p>Attendance 30 %</p>
                                
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat totam perferendis, in dolore, eveniet dolor, cumque odit rerum dignissimos eius tempora facilis. Architecto quod excepturi reiciendis odio, quisquam suscipit molestiae.
                                </p>
                                <p className='font-bold'>Status - Pending</p>
                            </>
                        ),
                    },
                    {
                        color: 'red',
                        children: ( 
                            <>
                                <p>Web development foundation</p>
                                <p>
                                    <Coursedrawer name={"Course 1"} postid={1}/>
                                </p>
                                <p>Attendance 30 %</p>
                                <p className='font-bold'>Status - Reject</p>
                            </>
                        ),
                    }
                    
                ]
            }
        />
    )
}