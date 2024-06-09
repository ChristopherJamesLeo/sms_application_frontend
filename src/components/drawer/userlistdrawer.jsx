import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios, { Axios } from 'axios';
const { Option } = Select;
const Userlistdrawer = ({name,userid}) => {

    
    const [open, setOpen] = useState(false);
    const [data , setData] = useState({});
    const showDrawer = () => {
        setOpen(true);
        console.log(userid);
        if(userid){
            let url = `https://jsonplaceholder.typicode.com/users/${userid}`;
            axios.get(url).then( response => {
                // console.log(response.data);
                setData(response.data);
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
            title={data.address ? data.address.street : "Loading..."}
            width={720}
            onClose={onClose}
            open={open}
            styles={{
            body: {
                paddingBottom: 80,
            },
            }}
            extra={
            <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} type="primary">
                Submit
                </Button>
            </Space>
            }
        >

        </Drawer>
        </>
    );

};
export default Userlistdrawer;