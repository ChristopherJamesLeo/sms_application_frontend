import React from 'react';
import { Input } from 'antd';
const { Search } = Input;


const onSearch = (value, _e, info) => console.log(info?.source, value);

export default function Allsearch(){
    return (
        <>
            <Search placeholder="Search All" style={{
                width: "350px"
            }} onSearch={onSearch} enterButton />
        </>
    )
}