import React, { useState } from "react"

import { DatePicker ,Button, Input ,Space , Select } from 'antd';
// import { DatePickerProps, GetProps } from 'antd';

// type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

// const { RangePicker } = DatePicker;


// export default function UserSearch(){

//     const [dates,setDate] = useState([]);

//     // Start Date Picker
//     const onOk = (values: DatePickerProps[] | RangePickerProps[]) => {
//         // const formattedValues = values.map((value) => value.format("YYYY-MM-DD HH:mm"));
//         setDate(values);

//     };
//     // End Date Picker

//     // START BUTTONS
//     const [loadings, setLoadings] = useState([]);

//     const enterLoading = (index) => {
//         setLoadings((prevLoadings) => {
//             const newLoadings = [...prevLoadings];
//             newLoadings[index] = true;
//             return newLoadings;
//         });
    
//         setTimeout(() => {
//             setLoadings((prevLoadings) => {
//                 const newLoadings = [...prevLoadings];
//                 newLoadings[index] = false;
//                 return newLoadings;
//             });
//         }, 3000);
//     };

//     // END BUTTONS

//         // Start Search Button
//         function searchHandler(){
//             enterLoading(0);
//             let getDates = dates.map(function(date){
//                 return date.format("YYYY-MM-DD HH:mm");
//             })
//             console.log(getDates);
//         }
//         // End Search Button
    
//         // Start Reset Button
//         function resetHandler(){
//             enterLoading(1);
//             let getDates = dates.map(function(date){
//                 return date.format("YYYY-MM-DD HH:mm");
//             })
//             console.log(getDates);
//         }
//         // End Reset Button
    
//         // Start Export Butotn
//         function exportHandler(){
//             enterLoading(2);
//             let getDates = dates.map(function(date){
//                 return date.format("YYYY-MM-DD HH:mm");
//             })
//             console.log(getDates);
//         }
//         // End Export button
    


//     return (
//         <>
//             <Space>
                
//                 <Input placeholder="Enter Student ID" style={
//                     {
//                         width : "250px"
//                     }
//                 }/>
//                 <Select
//                     showSearch
//                     placeholder="Select Role"
//                     filterOption={(input, option) =>
//                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//                     }
//                     options={[
//                     { value: '1', label: 'Jack' },
//                     { value: '2', label: 'Lucy' },
//                     { value: '3', label: 'Tom' },
//                     ]}
//                 />
//                 <RangePicker
//                     showTime
//                     format="YYYY-MM-DD HH:mm"
//                     onChange={(values, dateString) => {
//                         console.log('Selected Time: ', values);
//                         console.log('Formatted Selected Time: ', dateString);
//                     }}
//                     onOk={onOk}
//                 />
//                 <Button key={0} type="primary" loading={loadings[0]} onClick={searchHandler}>
//                     Search
//                 </Button>
//                 <Button key={1} type="primary" loading={loadings[1]} onClick={resetHandler}>
//                     Reset
//                 </Button>
//                 <Button key={2} type="primary" loading={loadings[2]} onClick={exportHandler}>
//                     Export
//                 </Button>
//             </Space>
//         </>
//     )

// }

export default function UserSearch(){
    return (
        <>
            {/* <div>Hello</div> */}
        </>
    )
}