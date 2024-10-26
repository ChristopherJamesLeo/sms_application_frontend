import React, { useState , useRef , forwardRef, useEffect} from 'react';
import { Routes, Route , Link , useNavigate} from 'react-router-dom';
import {
  PieChartOutlined,
  UserOutlined,
  BookOutlined,
  UserSwitchOutlined,
  AuditOutlined,
  VideoCameraAddOutlined,
  BarChartOutlined,
  NotificationOutlined,
  NodeExpandOutlined,
  BranchesOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  QuestionCircleOutlined,
  CommentOutlined,
  TransactionOutlined
  
} from '@ant-design/icons';
import { logout } from '../authantication/Auth';
import { Button, Layout, Menu, theme , Tour } from 'antd';
import Allsearch from '../inputs/Allsearch';

import Userstable from '../pages/UserList';
import StaffLists from '../pages/StaffLists';

import Overview from '../pages/Overview';

import Appeals from '../pages/Appeals';
import Orders from '../pages/Orders';
import SuccessOrders from '../pages/SuccessOrders';

import Courses from '../pages/CoursesList';

import Enrolls from '../pages/EnrollsList';
import PointEnrolls from '../pages/PointEnrolls';
import FeeEnrolls from '../pages/FeeEnrolls';

import Attendances from '../pages/AttendancesList';
import Leaverecords from '../pages/LeaveRecordsList';
import Videorecords from '../pages/VideoRecordsList';
import Gpalist from '../pages/GpaList';
import Announcements from '../pages/AnnouncementsList';
import Activities from '../pages/ActivitiesList';
import Realnames from '../pages/RealNamesList';
import Deviceinfos from '../pages/DeviceInfosList';
import Verificationlogs from '../pages/VerificationLogsList';
import Invitations from '../pages/InvitationLists';
import Courseservices from '../pages/CourseServices';
import ServiceLists from '../pages/ServiceLists';
import SurveyPlatform from '../pages/SurveyPlatformLists';
import PointPackages from '../pages/PointPackages';
import PointChangeRecord from '../pages/PointChangeRecord';
import LeadAttendancesList from '../pages/LeadAttendancesList';


import Theme from '../settings/Theme';
import Statues from '../settings/Statuses';
import Stages from '../settings/Stages';
import Categories from '../settings/Categories';
import Days from '../settings/Days';
import Countries from '../settings/Countries';
import Cities from '../settings/Cities';
import Roles from '../settings/Roles';
import Genders from '../settings/Genders';
import Coursetypes from '../settings/CourseTypes';
import CourseLevel from '../settings/CourseLevel';
import Paymentstype from '../settings/PaymentTypes';

import Paymentmethods from '../settings/PaymentMethods';
import Operationplatform from '../settings/OperationPlatforms';
import Surveyplatform from '../settings/SurveyPlatforms';
import Gpagrades from '../settings/GpaGrades';
import IpBanList from '../pages/IpBanList';

import Login from '../authantication/Login';
import ServiceTypes from '../settings/ServiceTypes';

const { Header, Sider, Content } = Layout;



const CustomLabel = forwardRef(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});


// if(navigator.geolocation){
//   navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position);
//   })
// }

// if(navigator.onLine){
//   console.log("is online");
// }else {
//   console.log("is offline")
// }

// console.log(navigator);


const MainLayout = () => {

  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem('userData'));;
  // console.log(userData);
  // console.log(userData);
  // useEffect(()=>{
  //   console.log(userData);
  //   if(!userData.username && !userData.password){
  //     navigate('/login');
  //   }
  // },[]);

  // console.log(localStorage.getItem("userData"));
  let name = userData.name;

  // console.log(username,password,email);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const ref8 = useRef(null);
    const ref9 = useRef(null);
    const ref10 = useRef(null);
    const ref11 = useRef(null);
    const ref12 = useRef(null);
    const ref13 = useRef(null);
    const ref14 = useRef(null);
    const ref15 = useRef(null);
    const ref16 = useRef(null);

    const items = [
      {
        key: '1',
        icon: <PieChartOutlined />,
        label: <Link to="/" ref = {ref2}>Dashboard</Link>,
      },

      {
        key: 'sub1',
        label: (
          <CustomLabel ref={ref3}>
              Users Management
          </CustomLabel>
        ) ,
      
        icon: <UserOutlined />,
        children: [
          {
            key: '2',
            label: <Link to="/userlists"  >User List</Link>,
          },
          {
            key: '332',
            label: <Link to="/stafflists"  >Staff List</Link>,
          }
        ],
      },{
        key: 'sub2',
        label: (
          <CustomLabel ref={ref4}>
              Point Management
          </CustomLabel>
        ) ,
      
        icon: <DollarOutlined />,
        children: [
          {
            key: '2343',
            label: <Link to="/orderlists"  >Orders</Link>,
          },
          {
            key: '837',
            label: <Link to="/appeallists"  >Appeals</Link>,
          },
          {
            key: '1112',
            label: <Link to="/successorders"  >Success Orders</Link>,
          }
        ],
      },
      {
        key: 'sub3',
        label:  (
          <CustomLabel ref={ref5}>
            Courses
          </CustomLabel>
        ) ,
        icon: <BookOutlined />,
        children: [
          {
            key: '3',
            label: <Link to="/courses">Courses</Link>,
          }
        ],
      },
      {
        key: 'sub4',
        label:  (
          <CustomLabel ref= {ref6}>
            Roster
          </CustomLabel>
        ) ,
        icon: <UserSwitchOutlined />,
        children: [
          {
            key: '4',
            label: <Link to="/enrollLists">Enroll List</Link>,
          },
          {
            key: '2933',
            label: <Link to="/pointenrolls">Point Enroll</Link>,
          },
          {
            key: '2133',
            label: <Link to="/feeEnrolls">Fee Enroll</Link>,
          }
        ],
      },
      {
        key: 'sub5',
        label:  (
          <CustomLabel ref={ref7}>
            Attendances
          </CustomLabel>
        ) ,
        icon: <AuditOutlined />,
        children: [
          {
            key: '5',
            label: <Link to="/attendances">Attendance List</Link>,
          },{
            key: '1242',
            label: <Link to="/leadattendances">Lead Attendence List</Link>,
          },
          {
            key: '6',
            label: <Link to="/leaverecords">Leave Record</Link>,
          }
        ],
      },
      {
        key: 'sub6',
        label: (
          <CustomLabel ref={ref8}>
            Record Management
          </CustomLabel>
        ) ,
        icon: <VideoCameraAddOutlined />,
        children: [
          {
            key: '7',
            label: <Link to="/records">Video Records</Link>,
          }
        ],
      },
      {
        key: 'sub7',
        label:(
          <CustomLabel ref={ref9}>
            GPA Management
          </CustomLabel>
        ),
        icon: <BarChartOutlined />,
        children: [
          {
            key: '8',
            label: <Link to="/gpa">GAP List</Link>,
          }
        ],
      },
      {
        key: 'sub8',
        label: (
          <CustomLabel ref={ref10}>
            Announcements
          </CustomLabel>
        ),
        icon: <NotificationOutlined />,
        children: [
          {
            key: '9',
            label: <Link to="/announcements">Announcements</Link>,
          },
          {
            key: '34',
            label: <Link to="/activities">Activities</Link>,
          }
        ],
      },
      {
        key: 'sub9',
        label:  (
          <CustomLabel ref={ref11}>
            User Operation
          </CustomLabel>
        ),
        icon: <NodeExpandOutlined />,
        children: [
          {
            key: '10',
            label: <Link to="/realnames">User Realname</Link>,
          },
          {
            key: '11',
            label: <Link to="/deviceinfos">Device Infos</Link>,
          },
          {
            key: '213',
            label: <Link to="/ipbanlists">IP Ban List</Link>,
          },
          {
            key: '12',
            label: <Link to="/verificationlogs">Verification Logs</Link>,
          },
        ],
      },
      {
        key: 'sub10',
        label:  (
          <CustomLabel ref={ref12}>
            Relationship
          </CustomLabel>
        ),
        icon: <BranchesOutlined />,
        children: [
          {
            key: '13',
            label: <Link to="/invitations">Invitations</Link>,
          },
        ],
      },
      {
        key: 'sub11',
        label: (
          <CustomLabel ref={ref13}>
            Services
          </CustomLabel>
        ),
        icon: <CommentOutlined />,
        children: [
          {
            key: '16',
            label: <Link to="/courseservices">Course Service</Link>,
          },
          {
            key: '18',
            label: <Link to="/servicelinks">Customer Service</Link>,
          },
        ],
      },
      {
        key: 'sub12',
        label: (
          <CustomLabel ref={ref14}>
            Survery
          </CustomLabel>
        ),
        icon: <NotificationOutlined />,
        children: [
          {
            key: '3473',
            label: <Link to="/surveyrecords">Survery Record</Link>,
          }
        ],
      },{
        key: 'sub13',
        label: (
          <CustomLabel ref={ref15}>
            Point Control
          </CustomLabel>
        ),
        icon: <TransactionOutlined />,
        children: [
          {
            key: '27612',
            label: <Link to="/pointpackages">Packages</Link>,
          },
        
          {
            key: '27632',
            label: <Link to="/pointchangerecords">Points Change Records</Link>,
          }
        ],
      },
      {
        key: 'sub14',
        label: (
          <CustomLabel ref={ref16}>
            System Setting
          </CustomLabel>
        ),
        icon: <SettingOutlined />,
        children: [
          {
            key: '19',
            label: <Link to="/themes">Theme</Link>,
          },
          {
            key: '20',
            label: <Link to="/statuses">Statuses</Link>,
          },
          {
            key: '21',
            label: <Link to="/stages">Stages</Link>,
          },
          {
            key: '22',
            label: <Link to="/categories">Categories</Link>,
          },
          {
            key: '23',
            label: <Link to="/days">Days</Link>,
          },
          {
            key: '24',
            label: <Link to="/coutries">Countries</Link>,
          },
          {
            key: Math.round(Math.random() * 1000),
            label: <Link to="/cities">Cities</Link>,
          },
          {
            key: '25',
            label: <Link to="/roles">Roles</Link>,
          },
          {
            key: '26',
            label: <Link to="/genders">Gender</Link>,
          },
          {
            key: '27',
            label: <Link to="/coursetypes">Course Type</Link>,
          },
          {
            key: '33',
            label: <Link to="/courselevel">Course Level</Link>,
          },
          {
            key: '28',
            label: <Link to="/paymenttypes">Payment Type</Link>,
          }
          ,
          {
            key: '29',
            label: <Link to="/paymentmethods">Payment Method</Link>,
          },
          {
            key: '30',
            label: <Link to="/operationplatforms">Operation Platform</Link>,
          },
          {
            key: '31',
            label: <Link to="/surveyplatforms">Survey Platform</Link>,
          },
          {
            key: '210',
            label: <Link to="/servicetypes">Service Types</Link>,
          },
          {
            key: '32',
            label: <Link to="/grades">GPA Grades</Link>,
          }
        ],
      }
    ];

    const steps = [
      {
        title: 'Upload File',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate mollitia suscipit eum consequuntur molestias iusto libero nemo neque beatae nostrum fugit quam, quidem cum, ipsa quibusdam iure tenetur quos distinctio?',
        target: () => ref1.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Save',
        description: 'Save your changes.',
        target: () => ref2.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref3.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref4.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref5.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref6.current,
        sstyle : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref7.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref8.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref9.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref10.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref11.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref12.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref13.current,
        style : {padding : "0px 0px"}
      }
      ,
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref14.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref15.current,
        style : {padding : "0px 0px"}
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref16.current,
        style : {padding : "0px 0px"}
      }
    ];
    const getLevelKeys = (items1) => {
      const key = {};
      const func = (items2, level = 1) => {
        items2.forEach((item) => {
          if (item.key) {
            key[item.key] = level;
          }
          if (item.children) {
            func(item.children, level + 1);
          }
        });
      };
      func(items1);
      return key;
    };
    const levelKeys = getLevelKeys(items);

      const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
      const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
          const repeatIndex = openKeys
            .filter((key) => key !== currentOpenKey)
            .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
          setStateOpenKeys(
            openKeys
              // remove repeat key
              .filter((_, index) => index !== repeatIndex)
              // remove current level all child
              .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
          );
        } else {
          // close
          setStateOpenKeys(openKeys);
        }
      };


      const [open, setOpen] = useState(false);


      const [collapsed, setCollapsed] = useState(false);

      function helpHandler(){
        setOpen(true);
        setCollapsed(false);
      }

      const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return (
    <>
      <Layout theme="light">


        
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          > 
            <div className='flex items-center justify-between px-5'>
              <div className='flex items-center'>
                <div className='flex items-center gap-x-3 '>
                  {/* <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" style={
                      {
                        width :"50px",
                        height: "50px"
                      }
                    } /> */}
                    <h2 className='text-2xl font-semibold'>Ninth Programming</h2>
                    <Button
                      type="text"
                      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                      fontSize: '18px',
                      width: 30,
                      height: 30,
                      }}
                    />
                  
                </div>
                <div className='flex ml-4'>
                  <Allsearch />
                </div>
                
              </div>
              
              

              <div className='flex gap-x-5'>
                  <div>
                    Hello {name}
                  </div>
                  <div 
                    style={
                      {
                        cursor: "pointer"
                      }
                    }
                    onClick={()=>{
                      if(window.confirm("Are You sure to log our")){
                        logout().then((response)=> {
                          if(response.status === "ok"){
                            localStorage.removeItem('userData');
                            localStorage.removeItem('api_token');
                            localStorage.removeItem('remember_token');
                            navigate('/login');
                          }
                        })
                        
                      }
                      
                  }}>
                    Log Out
                  </div>
              </div>

              

            </div>
            
          </Header>
          <Layout>
            <Sider trigger={null} collapsedWidth={100} width={250} collapsible collapsed={collapsed} theme='light' style={
            {
                height : "100vh",
                overflowY : "scroll",
                padding : "0px 0px 0px 0px",
            }
            }>

            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              openKeys={stateOpenKeys}
              onOpenChange={onOpenChange}
              theme="light"
              style={
                {
                  fontSize: "13px",
                }
              }
              items={items}
            />
            
            <span ref = {ref1} title='Help' onClick={() => helpHandler() } style={
              {
                position: "fixed",
                right : "15px",
                bottom : "15px",
                fontSize : "20px",
                cursor: "pointer",
                zIndex : 100
              }
            }>
              <QuestionCircleOutlined />
            </span>
            
              
          
          </Sider>
          <Content style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 100,
              height : "95vh",
              overflowY: "scroll", 
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            <Routes>
              
              
                <Route path='/dashboard' element={<Overview title="Overview" />}/>
                
                <Route path='/userlists' element={<Userstable title="User Lists" />}/>
                <Route path='/stafflists' element={<StaffLists title="Staff Lists" />}/>

                <Route path='/orderlists' element={<Orders title="Order Lists" />}/>
                <Route path='/appeallists' element={<Appeals title="Appeal Lists" />}/>
                <Route path='/successorders' element={<SuccessOrders title="Success Orders" />}/>
                

                <Route path='/courses' element={<Courses title="All Courses" />}/>

                <Route path='/enrollLists' element={<Enrolls title="Enroll Orders" />}/>
                <Route path='/pointenrolls' element={<PointEnrolls title="Enroll With Point" />}/>
                <Route path='/feeEnrolls' element={<FeeEnrolls title="Enroll With Fee" />}/>

                <Route path='/attendances' element={<Attendances title="Student Attendences" />}/>
                <Route path="/leadattendances" element={<LeadAttendancesList title={"Lead Attendances"}/>}/>
                <Route path='/leaverecords' element={<Leaverecords title="Leave Records" />}/>

                <Route path='/records' element={<Videorecords title="Video Records" />}/>

                <Route path='/gpa' element={<Gpalist title="Grade Poing Average" />}/>

                <Route path='/announcements' element={<Announcements title="Announcements" />}/>
                <Route path='/activities' element={<Activities title="Activities" />}/>

                <Route path='/realnames' element={<Realnames title="Users Real Name" />}/>
                <Route path='/deviceinfos' element={<Deviceinfos title="User Device Info" />}/>
                <Route path='/verificationlogs' element={<Verificationlogs title="Verification Logs" />}/>
                <Route path="/ipbanlists" element={<IpBanList title={"IP Ban List"} />} />

                <Route path='/invitations' element={<Invitations title="Invitation List" />}/>

                <Route path='/courseservices' element={<Courseservices title="Course Services Links" />}/>
                <Route path='/servicelinks' element={<ServiceLists title="Customer Service" />}/>

                <Route path='/surveyrecords' element={<SurveyPlatform title="Survey Records" />}/>

                <Route path="pointpackages" element={<PointPackages title="Packages" />} />
                <Route path='/pointchangerecords' element={<PointChangeRecord title="Point Change Records" />}/>

                <Route path='/themes' element={<Theme title="Theme Setting" />}/>
                <Route path='/statuses' element={<Statues title="Statuses" />}/>
                <Route path='/stages' element={<Stages title="Stages" />}/>
                <Route path='/categories' element={<Categories title="Categories" />}/>
                <Route path='/days' element={<Days title="Days" />}/>
                <Route path='/coutries' element={<Countries title="Countries" />}/>
                <Route path='/cities' element={<Cities title="Cities" />}/>
                <Route path='/roles' element={<Roles title="Roles" />}/>
                <Route path='/genders' element={<Genders title="Genders" />}/>
                <Route path='/coursetypes' element={<Coursetypes title="Course Type" />}/>
                <Route path='/courselevel' element={<CourseLevel title="Course Level" />}/>
                <Route path='/paymenttypes' element={<Paymentstype title="Payment Types" />}/>
                <Route path='/paymentmethods' element={<Paymentmethods title="Payment Methods" />}/>
                <Route path='/operationplatforms' element={<Operationplatform title="Operation Platforms" />}/>
                <Route path='/surveyplatforms' element={<Surveyplatform title="Survey Platforms" />}/>
                <Route path='/servicetypes' element={<ServiceTypes title="Service Types" />}/>
                <Route path='/grades' element={<Gpagrades title="GPA Grades" />}/>

                
            </Routes>
          </Content>

          </Layout>

          <Tour
            open={open}
            onClose={() => setOpen(false)}
            steps={steps}
            style = {
              {
                padding : "10px"
              }
            }
            indicatorsRender={(current, total) => (
              <span>
                {current + 1} / {total}
              </span>
            )}
          />
        </Layout>

      </Layout>
    </>
  );
};
export default MainLayout;