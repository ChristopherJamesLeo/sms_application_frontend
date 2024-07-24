import React, { useState , useRef , forwardRef} from 'react';
import { Routes, Route , Link } from 'react-router-dom';
import {
  PieChartOutlined,
  UserOutlined,
  BookOutlined,
  MailOutlined,
  UserSwitchOutlined,
  AuditOutlined,
  VideoCameraAddOutlined,
  BarChartOutlined,
  NotificationOutlined,
  NodeExpandOutlined,
  BranchesOutlined,
  LinkOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EllipsisOutlined,
  QuestionCircleOutlined
  
} from '@ant-design/icons';
import { Button, Layout, Menu, theme , Tour } from 'antd';
import Allsearch from '../inputs/Allsearch';
import Userstable from '../tables/UserList';
import StaffLists from '../tables/StaffLists';
import Overview from '../pages/Overview';
import Courses from '../tables/CoursesList';
import Enrolls from '../tables/EnrollsList';
import Attendances from '../tables/AttendancesList';
import Leaverecords from '../tables/LeaveRecordsList';
import Videorecords from '../tables/VideoRecordsList';
import Gpalist from '../tables/GpaList';
import Announcements from '../tables/Announcementslist';
import Activities from '../tables/ActivitiesList';
import Realnames from '../tables/RealNamesList';
import Deviceinfos from '../tables/DeviceInfosList';
import Verificationlogs from '../tables/VerificationLogsList';
import Invitations from '../tables/InvitationLists';
import Courseservices from '../tables/CourseServices';
import Services from '../tables/ServiceLists';
import Surveyrecords from '../tables/SurveyRecordsList';
import Theme from '../tables/Theme';
import Statues from '../tables/Statuses';
import Stages from '../tables/Stages';
import Categories from '../tables/Categories';
import Days from '../tables/Days';
import Countries from '../tables/Countries';
import Roles from '../tables/Roles';
import Genders from '../tables/Genders';
import Coursetypes from '../tables/CourseTypes';
import CourseLevel from '../tables/CourseLevel';
import Paymentstype from '../tables/PaymentTypes';
import Paymentmethods from '../tables/PaymentMethods';
import Operationplatform from '../tables/OperationPlatforms';
import Surveyplatform from '../tables/SurveyPlatforms';
import Gpagrades from '../tables/GpaGrades';

const { Header, Sider, Content } = Layout;



const CustomLabel = forwardRef(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});






const MainLayout = () => {

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
  },
  {
    key: 'sub2',
    label:  (
      <CustomLabel ref={ref4}>
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
    key: 'sub3',
    label:  (
      <CustomLabel ref= {ref5}>
        Roster
      </CustomLabel>
    ) ,
    icon: <UserSwitchOutlined />,
    children: [
      {
        key: '4',
        label: <Link to="/enrollLists">Enroll List</Link>,
      }
    ],
  },
  {
    key: 'sub4',
    label:  (
      <CustomLabel ref={ref6}>
        Attendances
      </CustomLabel>
    ) ,
    icon: <AuditOutlined />,
    children: [
      {
        key: '5',
        label: <Link to="/attendances">Attendance List</Link>,
      },
      {
        key: '6',
        label: <Link to="/leaverecords">Leave Record</Link>,
      }
    ],
  },
  {
    key: 'sub5',
    label: (
      <CustomLabel ref={ref7}>
        Record Management
      </CustomLabel>
    ) ,
    icon: <VideoCameraAddOutlined />,
    children: [
      {
        key: '7',
        label: <Link to="/records">Records</Link>,
      }
    ],
  },
  {
    key: 'sub6',
    label:(
      <CustomLabel ref={ref8}>
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
    key: 'sub7',
    label: (
      <CustomLabel ref={ref9}>
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
    key: 'sub8',
    label:  (
      <CustomLabel ref={ref10}>
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
        key: '12',
        label: <Link to="/verificationlogs">Verification Logs</Link>,
      },
    ],
  },
  {
    key: 'sub9',
    label:  (
      <CustomLabel ref={ref11}>
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
    key: 'sub10',
    label: (
      <CustomLabel ref={ref12}>
        Services
      </CustomLabel>
    ),
    icon: <LinkOutlined />,
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
      <CustomLabel ref={ref13}>
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
  },
  {
    key: 'sub11',
    label: (
      <CustomLabel ref={ref14}>
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
      },
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
        label: <Link to="/serviceplatforms">Service Platform</Link>,
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
                <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="" style={
                    {
                      width :"50px",
                      height: "50px"
                    }
                  } />
                  <h2 className='text-2xl'>Ninth Programming</h2>
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
            
            

            <div>Hello James</div>

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
            height : "80vh",
            overflowY: "scroll", 
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
          <Routes>
            <Route path='/' element={<Overview title="Overview" />}/>
            
            <Route path='/userlists' element={<Userstable title="User Lists" />}/>
            <Route path='/stafflists' element={<StaffLists title="Staff Lists" />}/>
            

            <Route path='/courses' element={<Courses title="All Courses" />}/>

            <Route path='/enrollLists' element={<Enrolls title="User Enroll" />}/>

            <Route path='/attendances' element={<Attendances title="Student Attendences" />}/>
            <Route path='/leaverecords' element={<Leaverecords title="Leave Records" />}/>

            <Route path='/records' element={<Videorecords title="Video Records" />}/>

            <Route path='/gpa' element={<Gpalist title="Grade Poing Average" />}/>

            <Route path='/announcements' element={<Announcements title="Announcements" />}/>
            <Route path='/activities' element={<Activities title="Activities" />}/>

            <Route path='/realnames' element={<Realnames title="Users Real Name" />}/>
            <Route path='/deviceinfos' element={<Deviceinfos title="User Device Info" />}/>
            <Route path='/verificationlogs' element={<Verificationlogs title="Verification Logs" />}/>

            <Route path='/invitations' element={<Invitations title="Invitation List" />}/>

            <Route path='/courseservices' element={<Courseservices title="Course Services Links" />}/>
            <Route path='/servicelinks' element={<Services title="Customer Service" />}/>

            <Route path='/surveyrecords' element={<Surveyrecords title="Survey Records" />}/>

            <Route path='/themes' element={<Theme title="Theme Setting" />}/>
            <Route path='/statuses' element={<Statues title="Statuses" />}/>
            <Route path='/stages' element={<Stages title="Stages" />}/>
            <Route path='/categories' element={<Categories title="Categories" />}/>
            <Route path='/days' element={<Days title="Days" />}/>
            <Route path='/coutries' element={<Countries title="Countries" />}/>
            <Route path='/roles' element={<Roles title="Roles" />}/>
            <Route path='/genders' element={<Genders title="Genders" />}/>
            <Route path='/coursetypes' element={<Coursetypes title="Course Type" />}/>
            <Route path='/courselevel' element={<CourseLevel title="Course Level" />}/>
            <Route path='/paymenttypes' element={<Paymentstype title="Payment Types" />}/>
            <Route path='/paymentmethods' element={<Paymentmethods title="Payment Methods" />}/>
            <Route path='/operationplatforms' element={<Operationplatform title="Operation Platforms" />}/>
            <Route path='/serviceplatforms' element={<Surveyplatform title="Service Platforms" />}/>
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
  );
};
export default MainLayout;