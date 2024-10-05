import React, { useState } from "react";
import { Button } from 'antd';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';
// import moment from 'moment';// npm install moment


type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;



export default function UserExport(){

    const [dates,setDate] = useState([]);
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

    // Start Date Picker
    const onOk = (values: DatePickerProps[] | RangePickerProps[]) => {
        // const formattedValues = values.map((value) => value.format("YYYY-MM-DD HH:mm"));
        setDate(values);

    };
    // End Date Picker

    // Start Search Button
    function searchHandler(){
        enterLoading(0);
        let getDates = dates.map(function(date){
            return date.format("YYYY-MM-DD HH:mm");
        })
        console.log(getDates);
    }
    // End Search Button

    // Start Reset Button
    function resetHandler(){
        enterLoading(1);
        let getDates = dates.map(function(date){
            return date.format("YYYY-MM-DD HH:mm");
        })
        console.log(getDates);
    }
    // End Reset Button

    // Start Export Butotn
    function exportHandler(){
        enterLoading(2);
        let getDates = dates.map(function(date){
            return date.format("YYYY-MM-DD HH:mm");
        })
        console.log(getDates);
    }
    // End Export button



    return (
        <>
            <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                onChange={(values, dateString) => {
                    console.log('Selected Time: ', values);
                    console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={onOk}
                 />
            <Button type="primary" loading={loadings[0]} onClick={searchHandler}>
                Search
            </Button>
            <Button type="primary" loading={loadings[1]} onClick={resetHandler}>
                Reset
            </Button>
            <Button type="primary" loading={loadings[2]} onClick={exportHandler}>
                Export
            </Button>
        </>
        
    )

}