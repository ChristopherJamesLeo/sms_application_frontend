import React, { useState } from 'react';
import { Button, Modal , ConfigProvider , Col, DatePicker, Form, Input, Row, Select, Space , InputNumber } from 'antd';

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
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        {children}
      </Button>
    );
};

const AddCourse = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
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
                            label="course"
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
                            <Select placeholder="Please choose the Type">
                            <Option value="private">Onlie</Option>
                            <Option value="public">Offline</Option>
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
                <Row gutter={16} className='offline_class'>
                    <Col span={8}>
                        <Form.Item
                            name="room_no"
                            label="Room Number"
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
                <Row gutter={16} className='online_class'>
                    <Col span={12}>
                        <Form.Item
                            name="zoomId"
                            label="Zoom Id"
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
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="owner"
                            label="Owner"
                            rules={[
                            {
                                required: true,
                                message: 'Please select an owner',
                            },
                            ]}
                        >
                            <Select placeholder="Please select an owner">
                            <Option value="xiao">Xiaoxiao Fu</Option>
                            <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="approver"
                            label="Approver"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the approver',
                            },
                            ]}
                        >
                            <Select placeholder="Please choose the approver">
                            <Option value="jack">Jack Ma</Option>
                            <Option value="tom">Tom Liu</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="dateTime"
                            label="DateTime"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the dateTime',
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
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                            {
                                required: true,
                                message: 'please enter url description',
                            },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
                        </Form.Item>
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