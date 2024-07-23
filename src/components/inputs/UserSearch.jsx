import React, { useState } from "react"

import { Button, Input ,Space } from 'antd';


export default function UserSearch(){

    // START BUTTONS
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
    
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 3000);
    };

    // END BUTTONS


    return (
        <Space.Compact style={{ width: '40%' }}>
            <Input placeholder="Enter Student ID"/>
            <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                Search
            </Button>
            <Button type="primary" loading={loadings[1]} onClick={() => enterLoading(1)}>
                Reset
            </Button>
        </Space.Compact>
    )

}