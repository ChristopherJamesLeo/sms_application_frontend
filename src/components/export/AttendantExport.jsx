import React, { useState } from "react";
import { Button, Form, Input, Row, Col, DatePicker, Select } from 'antd';
import api from "../api/api";

const { Option } = Select;

export default function AttendantExport() {
    const [dates, setDates] = useState([]);
    const [form] = Form.useForm();
    const [loadings, setLoadings] = useState(null);

    // Start Reset Button
    function resetHandler() {
        form.resetFields(); // Reset form fields
        setDates([]); // Reset any date state you have
    }

    // Start form submission handler (triggered by Search button)
    async function searchHandler() {
        console.log(form.getFieldValue()); // get value from form
    }

    // Start Export Button
    async function exportHandler() {
        console.log(form.getFieldValue()); 
        setLoadings(true);
        try {
            const response = await api.get(`/attendant/export`, {
                responseType: 'blob',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'attendants.xlsx');  // Set file name
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
                            name="attendantcode"
                        >
                            <Input placeholder="Attendant Code" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="status"
                        >
                            <Select placeholder="Please choose the Level">
                                <Option value="1">Level 1</Option>
                                <Option value="2">Level 2</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="date"
                        >
                            <DatePicker.RangePicker
                                style={{ width: "100%" }}
                                getPopupContainer={(trigger) => trigger.parentElement}
                            />
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
