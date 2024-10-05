import React, { useState } from "react";
import { Button, Form, Input, Row, Col, DatePicker, Select } from 'antd';
import api from "../api/api";

const { Option } = Select;

export default function StageExport({statuses,updateStageData}) {
    // console.log("status", statuses);
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
        let searchValue = form.getFieldValue();
        setLoadings(true);
        try {
            const response = await api.get(`/stage/search`,  {
                params : searchValue ,
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                // console.log(response.data);
                updateStageData(response.data)
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
        console.log(form.getFieldValue()); // ge value from form

        let searchValue = form.getFieldValue();
        setLoadings(true);
        try {
            const response = await api.get(`/stage/export` , {
                params : searchValue ,
                responseType: 'blob',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                }
            });
            if (response.data) {
                // console.log(response.data);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'stages.xlsx');  // Set file name
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
                <Row gutter={12} className="d-flex justify-end">
                    <Col span={6}>
                        <Form.Item
                            name="status_id"
                        >
                            <Select placeholder="Please choose the Level">
                                {
                                    statuses.map(function(status){
                                       
                                       return <Option key={status.id} value={status.id}>{status.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
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
                </Row>

                
               
            </Form>
        </>
    );
}
