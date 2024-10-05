
import React, { useState } from "react";
import { Button } from 'antd';
import { DatePicker, Space } from 'antd';
import api from "../api/api";
// import type { DatePickerProps, GetProps } from 'antd';
// import moment from 'moment';// npm install moment


// type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

// const { RangePicker } = DatePicker;



export default function UserExport(){

    const [dates,setDate] = useState([]);
    // START BUTTONS
    const [loadings, setLoadings] = useState(null);

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

    async function exportHandler(){
        setLoadings(true);
        try {
            const response = await api.get(`/user/export`, {
                responseType: 'blob',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'users.xlsx');  // Set file name
                document.body.appendChild(link);
                link.click();
                setLoadings(false);
                console.log("download successful");
            } else {
                console.log("download failed.");
            }
    
        } catch (err) {
            if (err.response) {
                console.log(err.response.status === 404 ? "Resource not found (404)." : `Error: ${err.response.status}`);
            } else if (err.request) {
                console.log("No response received from server.");
            } else {
                console.log("Error in setting up request.");
            }
        } finally {
            setLoadings(false);
            console.log("data fatch fail");
        }
    }

    // End Export button



    return (
        <>

            <Button type="primary" loading={loadings} onClick={exportHandler}>
                Export
            </Button>
        </>
        
    )

}