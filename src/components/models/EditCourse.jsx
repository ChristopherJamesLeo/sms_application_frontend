import React, { useEffect, useState } from 'react';
import {
    message,
    Checkbox,
    Button,
    Modal,
    ConfigProvider,
    Col,
    DatePicker,
    TimePicker,
    Form,
    Input,
    Row,
    Select,
    Space,
    InputNumber,
    Upload,
    Image
} from 'antd';
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
    var [coursedata,setCourseData] = useState({});
    var [days,setDays] = useState([]);
    var [trainers,setTrainers] = useState([]);
    var [types,setTypes] = useState([]);
    var [initialValue,setInitialValue] = useState({});

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

    // start image preview
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const beforeUpload = (file) => {
        // Read the selected file as a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setSelectedFile(file);


        // Prevent the file from being uploaded immediately
        return false;
    };

    // end image preview


    async function openModel(){
        setOpen(true);
        // console.log("helo");
        try {
            const response = await api.get(`/courses/${courseId}/edit`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                let data = response.data;
                setCategories(data.categories);
                setCourseData(data.course);
                setCourseLevels(data.courselevels);
                setDays(data.days);
                setTrainers(data.trainers);
                setTypes(data.types);
                setQuillValue(data.syllabus.syllaby);
                setInfoBox(data.course.course_type);

                // const startDate = moment(data.course.startdate, "DD-MM-YYYY");
                // const endDate = moment(data.course.enddate, "DD-MM-YYYY");
                // const startTime = moment(data.course.starttime, "HH:mm:ss");
                // const endTime = moment(data.course.endtime, "HH:mm:ss");

                form.setFieldsValue({
                    roomNo: data.course.courseContact ? data.course.courseContact.roomNo : null,
                    address: data.course.courseContact ? data.course.courseContact.address : null,
                    googleMap: data.course.courseContact ? data.course.courseContact.googleMap : null,
                    zoomId: data.course.courseContact ? data.course.courseContact.zoomId : null,
                    passcode: data.course.courseContact ? data.course.courseContact.passcode : null,
                    videoCount: data.course.courseContact ? data.course.courseContact.videoCount : null,
                    videoPoint: data.course.courseContact ? data.course.courseContact.videoPoint : null,
                    name: data.course.name,
                    trainer_id: data.course.trainer ? data.course.trainer.id : null,
                    category_id: data.course.category ? data.course.category.id : null,
                    level_id: data.course.level ? data.course.level.id : null,
                    coursetype_id: data.course.courseType ? data.course.courseType.id : null,
                    fee: data.course.fee,
                    paymentPoint: data.course.paymentPoint,
                    bonousPoint: data.course.bonousPoint,
                    attendedPoint: data.course.attendedPoint,
                    leavePoint: data.course.leavePoint,
                    days: data.coursedays.map(day => day.day_id),
                    // date: [startDate, endDate],
                    // time: [startTime, endTime]
                });
                console.log(data.coursedays);
            }else {
                return false;
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

    // console.log(coursedata);
    // start check box array
    const options = days.map((day) => ({
        label: day.name,
        value: day.id,
    }));
    // end check box array
    // start quill
    const [quillValue, setQuillValue] = useState('');
    function QuillValue(content){
        setQuillValue(content)
        
    }

    function classTypeHandler(value) {
        setInfoBox(value);
    }

    function infoBoxHandler(type = coursedata.courseType.id){

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
                                    message: 'Please enter video count',
                                },
                            ]}
                        >
                            <Input placeholder="Please Enter video count" />
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

    // start form submit
    async function formHandler(values){
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
        const formData = new FormData();

        const [startTime, endTime] = values.time;
        const [startDate, endDate] = values.date;

        formData.append("name",values.name);
        formData.append("roomNo",values.roomNo !== undefined ? values.roomNo : null);
        formData.append("address",values.address !== undefined ? values.address : null);
        formData.append("googleMap",values.googleMap !== undefined  ? values.googleMap : null);
        formData.append("zoomId",values.zoomId !== undefined ? values.zoomId : null);
        formData.append("passcode",values.passcode !== undefined ? values.passcode : null);
        formData.append("videoCount",values.videoCount !== undefined ? values.videoCount : null);
        formData.append("videoPoint",values.videoPoint !== undefined ? values.videoPoint : null);
        formData.append("trainer_id",values.trainer_id);
        formData.append("category_id",values.category_id);
        formData.append("level_id",values.level_id);
        formData.append("coursetype_id",values.coursetype_id);
        formData.append("fee",values.fee);
        formData.append("paymentPoint",values.paymentPoint);
        formData.append("bonousPoint",values.bonousPoint);
        formData.append("attendedPoint",values.attendedPoint);
        formData.append("leavePoint",values.leavePoint);
        formData.append("days", Array.from(values.days));
        formData.append("syllaby", quillValue);
        formData.append("starttime", startTime.format("DD-MM-YYYY"));
        formData.append("endtime", endTime.format("HH:mm:ss"));
        formData.append("startdate", startDate.format("DD-MM-YYYY"));
        formData.append("enddate", endDate.format("HH:mm:ss"));
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            // console.log(values);
            const response = await api.post(`/course/update/${courseId}`, formData , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}` ,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.data) {
                if (response.data) {
                    // let data = response.data;
                    fetchData()
                    success("Course Update Successfu");
                    console.log(response.data);
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

    return (
        <>
            <ConfigProvider >
                <Button type="primary" onClick={openModel}>
                    Edit Course
                </Button>
            </ConfigProvider>
            <Modal
                title="Edit Course"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => {
                    setOpen(false);
                    // setPreviewUrl(null);
                }}
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
                                    {
                                        trainers.map(function(trainer,id){
                                            return(
                                                <Option value={trainer.id}>{trainer.name}</Option>
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
                                                <Option value={categorie.id}>{categorie.name}</Option>
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
                                                <Option value={courselevel.id}>{courselevel.name}</Option>
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
                                <Select onChange={classTypeHandler}  placeholder="Please choose the Type">
                                    {
                                        types.map(function(type,id){
                                            return(
                                                <Option value={type.id}>{type.name}</Option>
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
                                key = {Math.floor(Math.random()*100)}
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
                            <Button type="primary" htmlType="submit" >Submit</Button>
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
    )


};
export default EditCourse;

















export function ChangeVisibility({visibility,visibilityId,courseId,fetchData,fetchAllData}) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => messageApi.open({ type: 'success', content: msg });
    const error = (msg) => messageApi.open({ type: 'error', content: msg });

    const [statuses, setStatuses] = useState([]);



    const onReset = () => form.resetFields();
    const formConfirm = () => form.submit();

    // start model data
    async function modelHandler(){
        setOpen(true)
        try {
            const response = await api.get(`/course/visibility`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                console.log(response.data);
                setStatuses(response.data.data);
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
    // end modal data

    const formHandler = async (values) => {
        // console.log(values);
        values.id = courseId;

        
        try {
            // console.log(values);
            const response = await api.put(`/course/visibility/${courseId}`, values , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
            });
            if (response.data) {
                // console.log(response.data);
                form.resetFields();
                setOpen(false);
                success("Data Update Successful");
                fetchData(courseId);
                fetchAllData()
                // fetchAll();
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
    // console.log(statuses);
    if(!statuses){
        return false;
    }


    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <span onClick={modelHandler} className='cursor-pointer ' style={
                    {
                        color: "blue"
                    }
                } >{visibility}</span>
            </ConfigProvider>
            {contextHolder}
            <Modal
                title="Verify Enroll"
                open={open}
                onCancel={() => { setOpen(false); onReset(); }}
                width={500}
                footer={null}
            >
                <Form layout="vertical" hideRequiredMark
                    onFinish={formHandler}
                    form={form}
                    initialValues={{ visibility_id : visibilityId }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="visibility_id"
                                label="Visibility"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please choose visibility',
                                },
                                ]}
                            >
                                <Select placeholder="Please choose the visibility">
                                    {
                                        statuses.map(function(status,id){
                                            // console.log(stage);
                                            return(
                                                <Option key={status.id} value={status.id}>{status.name}</Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button htmlType="button" onClick={onReset}>Reset</Button>
                    </Space>
                </Form>
            </Modal>
    </>
    );
};


// int = {
//     roomNo : coursedata.courseContact ? coursedata.courseContact.roomNo : null,
//     address : coursedata.courseContact ? coursedata.courseContact.address : null,
//     googleMap : coursedata.courseContact ? coursedata.courseContact.googleMap : null,
//     zoomId : coursedata.courseContact ? coursedata.courseContact.zoomId : null,
//     passcode : coursedata.courseContact ? coursedata.courseContact.passcode : null,
//     videoCount : coursedata.courseContact ? coursedata.courseContact.videoCount : null,
//     videoPoint : coursedata.courseContact ? coursedata.courseContact.videoPoint : null,
//     name : coursedata.name,
//     trainer_id : coursedata.trainer ? coursedata.trainer.id : null,
//     category_id : coursedata.category ? coursedata.category.id : null,
//     level_id : coursedata.level ? coursedata.level.id : null,
//     coursetype_id : coursedata.courseType ? coursedata.courseType.id : null,
//     fee : coursedata.fee,
//     paymentPoint : coursedata.paymentPoint,
//     bonousPoint : coursedata.bonousPoint,
//     attendedPoint : coursedata.attendedPoint,
//     leavePoint: coursedata.leavePoint,
// }