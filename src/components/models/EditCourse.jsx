import React, { useEffect, useState } from 'react';
import { message , Checkbox , Button, Modal , ConfigProvider , Col, DatePicker, TimePicker , Form, Input, Row, Select, Space , InputNumber , Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import moment from "moment";

// start img upload

// end img upload 


const EditCourse = ({courseId,fetchData}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [infoBox , setInfoBox] = useState(false);
    var [categories,setCategories] = useState([]);
    var [courselevels,setCourseLevels] = useState([]);
    var [days,setDays] = useState([]);
    var [trainers,setTrainers] = useState([]);
    var [types,setTypes] = useState([]);
    var [initialValue,setInitialValue] = useState({});

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (Object.keys(initialValue).length > 0) {
            form.setFieldsValue(initialValue);
        }
    }, [initialValue, form]);

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

    const getCourseData = async () => {
        setOpen(true);
        try {
            const response = await api.get(`/courses/${courseId}/edit`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    let data = response.data;
                    console.log(data);
                    console.log([moment(data.course.starttime,"HH:mm:ss"),moment(data.course.endtime,"HH:mm:ss")]);
                    setCategories(data.categories);
                    setCourseLevels(data.courselevels);
                    setDays(data.days);
                    setTrainers(data.trainers);
                    setTypes(data.types);
                    console.log(data.trainers ? data.trainers : null);
                    let initialValue = {
                        roomNo: data.coursecontact.roomNo ? data.coursecontact.roomNo : null,
                        address:  data.coursecontact.address ? data.coursecontact.address : null,
                        googleMap:  data.coursecontact.googleMap ? data.coursecontact.googleMap : null,
                        zoomId: data.coursecontact.zoomId ? data.coursecontact.zoomId : null,
                        passcode: data.coursecontact.passcode ? data.coursecontact.passcode : null,
                        videoCount: data.coursecontact.videoCount ? data.coursecontact.videoCount : null,
                        videoPoint: data.coursecontact.videoPoint ? data.coursecontact.videoPoint : null,
                        name: data.course.name,
                        trainer_id: data.course.trainer_id,
                        category_id: data.course.category_id,
                        level_id: data.course.level_id,
                        // coursetype_id: data.course.coursetype_id,
                        // time : [moment(data.course.starttime,"HH:mm:ss"),moment(data.course.endtime,"HH:mm:ss")],
                        // date : [moment(data.course.startdate,"YYYY/MM/DD"),moment(data.course.enddate,"YYYY/MM/DD")],
                        fee: data.course.fee,
                        paymentPoint: data.course.paymentPoint,
                        bonousPoint: data.course.bonousPoint,
                        attendedPoint: data.course.attendedPoint,
                        leavePoint: data.course.leavePoint,
                        days : data.coursedays.map(function(day){
                            return day.day_id;
                        }),
                        quillValue: null,
                        image: null,
                    };
                    setQuillValue(data.syllabus.syllaby)
                    setInitialValue(initialValue);

                }else {
                    return false;
                }
            } else {
                error("Edit failed.");
            }
    
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    error("Resource not found (404).");
                } else {
                    error(`Error: ${err.response.status}`);
                }
            } else if (err.request) {
                error("No response received from server.");
            } else {
                error("Error in setting up request.");
            }
        }
    };

    // console.log(categories,courselevels,days,trainers,types);

    function openModel(){
        getCourseData();
    }

    // start check box array
    const options = days.map(function(day,id){
        return {label : day.name , value : day.id}
    });
    // end check box array

    // start quill
    const [quillValue, setQuillValue] = useState('');


    function QuillValue(content){
        setQuillValue(content)
        
    }

    // function getQuilValue(){
    //     console.log(quillValue);
    // }
    // end quill



    // start image preview
    const [previewUrl, setPreviewUrl] = useState(null);

    const beforeUpload = (file) => {
        // Read the selected file as a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        // Prevent the file from being uploaded immediately
        return false;
    };
    
        // end image preview

        var [submittable, setSubmittable] = React.useState(false);
    // start submit button
    const SubmitButton = ({ form, children }) => {

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



    // start form submit
    async function formHandler(values){
        // console.log(values.date)
        if(values.date){
            const [startDate, endDate] = values.date;
            values.startdate = startDate.format("DD-MM-YYYY");
            values.enddate = endDate.format("DD-MM-YYYY");
        }else {
            values.startdate = null;
            values.enddate = null;
        }
        if(values.time){
            const [startTime, endTime] = values.time ;
        
            values.starttime = startTime.format("HH:mm:ss");
            values.endtime = endTime.format("HH:mm:ss");
        }else {
            values.starttime = null;
            values.endtime = null;
        }

        
        values.syllaby = quillValue;
        try {
            // console.log(values);
            const response = await api.put(`/courses/${courseId}`, values , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                if (response.data) {
                    // let data = response.data;
                    fetchData()
                    success("Course Update Successfu");
                }else {
                    return false;
                }
            } else {
                error("Edit failed.");
            }
    
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    error("Resource not found (404).");
                } else {
                    error(`Error: ${err.response.status}`);
                }
            } else if (err.request) {
                error("No response received from server.");
            } else {
                error("Error in setting up request.");
            }
        }

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
                            name="googleMap"
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
                
            )
        }else if(type == 1){
            return (
                <Row gutter={16} className='online_class'>
                    <Col span={6}>
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
                    <Col span={6}>
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
                    <Col span={6}>
                        <Form.Item
                            name="videoCount"
                            label="Video Count"
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
                    <Col span={6}>
                        <Form.Item
                            name="videoPoint"
                            label="Video Point"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter Video Point',
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
            <Button size='small' type="primary" onClick={openModel}>
                Edit Course
            </Button>
        </ConfigProvider>
            {contextHolder}
        <Modal
            title="Add Course"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => {
                setOpen(false);
                setPreviewUrl(null);
            }}
            width={1000}
            footer={null}
        >
            <Form form={form} onFinish={formHandler} name="validateOnly" initialValues={initialValue} layout="vertical" autoComplete="off">
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
                                {
                                    trainers.map(function(trainer,id){
                                        return(
                                            <Option key={id} value={trainer.id}>{trainer.name}</Option>
                                        );
                                    })
                                }
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
                                {
                                    categories.map(function(categorie,id){
                                        return(
                                            <Option key={id} value={categorie.id}>{categorie.name}</Option>
                                        );
                                    })
                                }
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
                                {
                                    courselevels.map(function(courselevel,id){
                                        return(
                                            <Option key={id} value={courselevel.id}>{courselevel.name}</Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="coursetype_id"
                            label="Type"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose the Type',
                            },
                            ]}
                        >
                            <Select onChange={classTypeHandler} placeholder="Please choose the Type">
                                {
                                    types.map(function(type,id){
                                        return(
                                            <Option key={id} value={type.id}>{type.name}</Option>
                                        );
                                    })
                                }
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
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="paymentPoint"
                            label="Payment Point"
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
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="bonousPoint"
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
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="attendedPoint"
                            label="Attended Point"
                            rules={[
                            {
                                required: true,
                                message: 'Attened Point',
                            },
                            ]}
                        >
                            <InputNumber
                                style={
                                        {
                                    width: "100%",
                                    }
                                }
                                min="0"
                                max="5000000"
                                step="1000"
                                stringMode
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="leavePoint"
                            label="Leave Point"
                            rules={[
                            {
                                required: true,
                                message: 'Leave Point',
                            },
                            ]}
                        >
                            <InputNumber
                                style={
                                        {
                                    width: "100%",
                                    }
                                }
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
                <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="image"
                                label="Poster"
                            >
                                <Upload 
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    accept="image/png, image/jpeg, image/jpg"
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>
                            {previewUrl && (
                                <div className={`mb-3 py-3 w-100 flex justify-center border-dashed border-2 border-gray-200 `}>
                                    <img src={previewUrl} alt="Image preview" style={{ maxWidth: '300px', maxHeight: '300px' , }} />
                                </div>
                            )}
                        </Col>
                    </Row>
                <div className='flex justify-end'>
                    <Space>
                        <SubmitButton form={form}>Submit</SubmitButton>
                        <Button htmlType="reset" onClick={
                            ()=>{
                                setPreviewUrl(null);
                            }
                        }>Reset</Button>
                    </Space>
                </div>
               
            </Form>
        </Modal>
        </>
    );
};
export default EditCourse;