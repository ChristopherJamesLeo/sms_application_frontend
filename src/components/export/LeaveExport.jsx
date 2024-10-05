import React, { useState } from "react";
import { Button, Form, Input, Row, Col, DatePicker, Select } from 'antd';
import api from "../api/api";

const { Option } = Select;

export default function LeaveExport({courses,stages,updateDate}) {
    console.log(courses,stages)
    const [dates, setDates] = useState([]);
    const [form] = Form.useForm();
    const [loadings, setLoadings] = useState(null);

    // Start Reset Button
    async function resetHandler() {
        form.resetFields(); // Reset form fields
        setDates([]); // Reset any date state you have
        setLoadings(true);
        try {
            const response = await api.get(`/leaves`, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                updateDate(response.data.leaves)
                setLoadings(false);
            } else {
                console.log("Download failed.");
            }
        } catch (err) {
            console.error("Error in download:", err);
        } finally {
            setLoadings(false);
        }
    }

    // Start form submission handler (triggered by Search button)
    async function searchHandler() {
        let searchValue = form.getFieldValue();
        if(searchValue.datetime){
            const dateRange = searchValue.datetime.map((date) => date.format('YYYY-MM-DD'));
            searchValue.startdate = dateRange[0];
            searchValue.enddate = dateRange[1];
        }
        

        console.log(searchValue);
        setLoadings(true);
        try {
            const response = await api.get(`/leave/search`,  {
                params : searchValue ,
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                console.log(response.data);
                updateDate(response.data)
            } else {
                console.log("search failed.");
            }
        } catch (err) {
            console.error("Error in search:", err);
        } finally {
            setLoadings(false);
        }
    }

    // Start Export Button
    async function exportHandler() {
        let searchValue = form.getFieldValue(); 
        setLoadings(true);
        try {
            const response = await api.get(`/leave/export`, {
                params: searchValue,
                responseType: 'blob',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'leaves.xlsx');  // Set file name
                document.body.appendChild(link);
                link.click();
                console.log("Download successful");
            } else {
                console.log("Download failed.");
            }
        } catch (err) {
            console.error("Error in download:", err);
        } finally {
            setLoadings(false);
        }
    }

    return (
        <>
            <Form
                form={form}
                style={{ width: "100%" }}
            >
                <Row gutter={12}>
                    <Col span={6}>
                        <Form.Item
                            name="regnumber"
                        >
                            <Input placeholder="User ID" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="course_id"
                        >
                            <Select placeholder="Please choose course" allowClear>
                                {
                                    courses.map(function(course){
                                        return <Option key={course.id} value={course.id}>{course.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="stage_id"
                        >
                            <Select placeholder="Please choose the Level" allowClear>
                                {
                                    stages.map(function(stage){
                                        return <Option key={stage.id} value={stage.id}>{stage.name}</Option>
                                    })
                                }
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="datetime"
                        >
                            <DatePicker.RangePicker
                                style={{ width: "100%" }}
                                getPopupContainer={(trigger) => trigger.parentElement}/>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <Button type="primary" onClick={searchHandler} loading={loadings}>
                        Search
                    </Button>
                    <Button type="default" onClick={resetHandler}  loading={loadings}>
                        Reset
                    </Button>
                    <Button type="primary" onClick={exportHandler} loading={loadings}>
                        Export
                    </Button>
                </div>
               
            </Form>
        </>
    );
}
