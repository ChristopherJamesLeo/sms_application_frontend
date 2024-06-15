import React, { useState } from 'react';
import { Checkbox , Button, Modal , ConfigProvider , Col, DatePicker, TimePicker , Form, Input, Row, Select, Space , InputNumber } from 'antd';



// start img upload

// end img upload 


const AddCourse = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [infoBox , setInfoBox] = useState(false);

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


    // start submit button
    const SubmitButton = ({ form, children }) => {

        const [submittable, setSubmittable] = React.useState(false);
      
        // Watch all values
        const values = Form.useWatch([], form);
        React.useEffect(() => {
          form
            .validateFields({
              validateOnly: true,
            })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
        }, [form, values]);
        return (
          <Button type="primary" htmlType="submit" onClick={() => setOpen(false)} disabled={!submittable}>
            {children}
          </Button>
        );
    };

    // end submit btn

    
    function classTypeHandler(value) {
        setInfoBox(value);
        
      }
    function infoBoxHandler(type ){
        
        if(type == 2){
            
            return(
                <Row gutter={16} className='offline_class'>
                    <Col span={8}>
                        <Form.Item
                            name="room_no"
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
        
        <Modal
            title="Add Course"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
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
                            name="trainer"
                            label="Trainer"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Trainer',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the Traier">
                            <Option value="private">James</Option>
                            <Option value="public">Christopher</Option>
                            <Option value="public">Leo</Option>
                            <Option value="public">Aung</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="course"
                            label="Course"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Course',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the Course">
                            <Option value="private">Web Development Foundation</Option>
                            <Option value="public">PHP</Option>
                            <Option value="public">Javascript</Option>
                            <Option value="public">Mysql</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="level"
                            label="Level"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Level',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the Level">
                            <Option value="private">Level 1</Option>
                            <Option value="public">Level 2</Option>
                            <Option value="public">Level 3</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="classtype"
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
                             <Checkbox.Group options={options} defaultValue={['Pear']} />
                        </Form.Item>
                    </Col>
                </Row>
                    

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="outline"
                            label="Course Outline"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Course Outline',
                            },
                            ]}
                        >
                            <Input.TextArea rows={10} placeholder="Please enter Course Outline" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        
                    </Col>
                </Row>
                <div className='flex justify-end'>
                    <Space>
                        <SubmitButton form={form}>Submit</SubmitButton>
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </div>
               
            </Form>
        </Modal>
        </>
    );
};
export default AddCourse;