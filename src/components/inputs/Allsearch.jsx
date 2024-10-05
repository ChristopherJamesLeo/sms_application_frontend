import React , { useState }from 'react';
import { Button, Input ,Space } from 'antd';

import SearchAll from "./../models/SearchAll";



export default function Allsearch(){
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
        <>
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="Search..."/>
                <SearchAll/>
            </Space.Compact>
        </>
    )
}