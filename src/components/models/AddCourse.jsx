import React, { useState } from 'react';
import { message , Checkbox , Button, Modal , ConfigProvider , Col, DatePicker, TimePicker , Form, Input, Row, Select, Space , InputNumber } from 'antd';
import axios from 'axios';
import $ from "jquery";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

// start img upload

// end img upload 


const AddCourse = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [infoBox , setInfoBox] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'User Add Successful',
        });
    };
    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'User Add Fail',
        })
    };

    // start check box array
    const options = [
        { label: 'Sunday', value: '1' },
        { label: 'Monday', value: '2' },
        { label: 'Thursday', value: '3' },
        { label: 'Wednesday', value: '4' },
        { label: 'Tuesday', value: '5' },
        { label: 'Friday', value: '6' },
        { label: 'Saturday', value: '7' },
    ];
    // end check box array

    // start quill
    const [quillValue, setQuillValue] = useState('');


    function QuillValue(content){
        setQuillValue(content)
        
    }

    function getQuilValue(){
        console.log(quillValue);
    }
    // end quill


    // start submit button
    // const SubmitButton = ({ form, children }) => {

    //     const [submittable, setSubmittable] = React.useState(false);
      
    //     // Watch all values
    //     const values = Form.useWatch([], form);
    //     React.useEffect(() => {
    //       form
    //         .validateFields({
    //           validateOnly: true,
    //         })
    //         .then(() => setSubmittable(true))
    //         .catch(() => setSubmittable(false));
    //     }, [form, values]);
    //     return (
    //       <Button type="primary" htmlType="submit" onClick={() => setOpen(false)} disabled={!submittable}>
    //         {children}
    //       </Button>
    //     );
    // };

    // end submit btn

    // start form submit
    function formHandler(value){
        console.log("hello form");
        
        const url = "https://666f5437f1e1da2be52288af.mockapi.io/SMS/courses";
       
        axios.post(url,value).then(function(response){
            console.log(response.data);
            setOpen(false);
            success();

        }).catch(error => {
           
            error();
        });
    }
    // end form submit
    
    function classTypeHandler(value) {
        setInfoBox(value);
        
      }
    function infoBoxHandler(type ){
        
        if(type == 2){
            
            return(
                <Row gutter={16} className='offline_class'>
                    <Col span={8}>
                        <Form.Item
                            name="roomNo"
                            label="Room Number"
                            defaultValue = "Room 122"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Title',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Course Title" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="address"
                            label="Address"
                            defaultValue = "Oakthar Myo Thit"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Title',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Course Title" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="location"
                            label="Location"
                            defaultValue = "Bago"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Location',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Course Location" />
                        </Form.Item>
                    </Col>
                </Row>
                
            )
        }else if(type == 1){
            return (
                <Row gutter={16} className='online_class'>
                    <Col span={12}>
                        <Form.Item
                            name="zoomId"
                            label="Zoom Id"
                            defaultValue = "3334 4242 9283"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter zoom id',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Zoom ID" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="passcode"
                            label="Passcode"
                            defaultValue = "American"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Passcode',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Passcode" />
                        </Form.Item>
                    </Col>
                </Row>
            )
        }
    }


    return (
        <>
        <ConfigProvider >
            <Button type="primary" onClick={() => setOpen(true)}>
                Add Course
            </Button>
        </ConfigProvider>
            {contextHolder}
        <Modal
            title="Add Course"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <Form form={form} onFinish={formHandler} name="validateOnly" layout="vertical" autoComplete="off">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Title"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Title',
                            },
                            ]}
                        >
                            <Input placeholder="Please Enter Course Title" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="trainer_id"
                            label="Trainer"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Trainer',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the Traier">
                            <Option value="1">James</Option>
                            <Option value="2">Christopher</Option>
                            <Option value="3">Leo</Option>
                            <Option value="4">Aung</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="category_id"
                            label="Course"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Course',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the Course">
                            <Option value="1">Web Development Foundation</Option>
                            <Option value="2">PHP</Option>
                            <Option value="3">Javascript</Option>
                            <Option value="4">Mysql</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="level_id"
                            label="Level"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Level',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the Level">
                            <Option value="1">Level 1</Option>
                            <Option value="2">Level 2</Option>
                            <Option value="3">Level 3</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="classtype_id"
                            label="Type"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Type',
                            },
                            ]}
                        >
                            <Select onChange={classTypeHandler} placeholder="Please choose the Type">
                                <Option value="1">Onlie</Option>
                                <Option value="2">Offline</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="fee"
                            label="Fee"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Fee',
                            },
                            ]}
                        >
                            <InputNumber
                                style={
                                        {
                                    width: "100%",
                                    }
                                }
                                defaultValue='50000'
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="point"
                            label="Paid Point"
                            rules={[
                            {
                                required: true,
                                message: 'Paid Point',
                            },
                            ]}
                        >
                            <InputNumber
                                style={
                                        {
                                    width: "100%",
                                    }
                                }
                                defaultValue='0'
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="bonous_point"
                            label="Bonous Point"
                            rules={[
                            {
                                required: true,
                                message: 'Bonous Point',
                            },
                            ]}
                        >
                            <InputNumber
                                style={
                                        {
                                    width: "100%",
                                    }
                                }
                                defaultValue='0'
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>

                </Row>
                {
                    infoBoxHandler(infoBox)
                }
                
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Date',
                            },
                            ]}
                        >
                            <DatePicker.RangePicker
                            style={{
                                width: '100%',
                            }}
                                getPopupContainer={(trigger) => trigger.parentElement}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="time"
                            label="Time"
                            rules={[
                            {
                                required: true,
                                message: 'please enter Time',
                            },
                            ]}
                        >
                            <TimePicker.RangePicker style={{
                                width: '100%',
                            }}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="days"
                            label="Days"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter select days',
                            },
                            ]}
                        >
                             <Checkbox.Group options={options}  />
                        </Form.Item>
                    </Col>
                </Row>
                    

                <Row gutter={16}>
                    <Col span={24}>
                        
                        <ReactQuill
                            placeholder='Syllabus'
                            style={
                                {
                                    marginBottom : "60px",
                                    height: "200px"
                                }
                            }
                            value={quillValue}
                            modules={{
                                
                                toolbar: [
                                [{ header: '1' }, { header: '2' }, { font: [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],[{ 'align': [] }],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image'],
                                ['code-block'],
                                ['clean'],
                                ],
                            }}
                            onChange={QuillValue}
                        />
                    </Col>
                </Row>
                <div className='flex justify-end'>
                    <Space>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </div>
               
            </Form>
        </Modal>
        </>
    );
};
export default AddCourse;