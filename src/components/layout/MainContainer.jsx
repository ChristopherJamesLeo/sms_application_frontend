import React, { useState , useRef , forwardRef} from 'react';
import { Link } from 'react-router-dom';
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
  PoundCircleOutlined,
  LinkOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EllipsisOutlined,
  QuestionCircleOutlined
  
} from '@ant-design/icons';
import { Button, Layout, Menu, theme , Tour } from 'antd';
import Allsearch from '../inputs/Allsearch';
import Userstable from '../tables/Userlist';

const { Header, Sider, Content } = Layout;



const CustomLabel = forwardRef(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});

const MainLayout = () => {
  // start tour 


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
  // const ref14 = useRef(null);
  // const ref15 = useRef(null);
  // const ref16 = useRef(null);
  // const ref17 = useRef(null);
  // const ref18 = useRef(null);
  // const ref19 = useRef(null);
  // const ref20 = useRef(null);
  // const ref21 = useRef(null);
  // const ref22 = useRef(null);
  // const ref23 = useRef(null);

  const [open, setOpen] = useState(false);

  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: <Link to="/" ref = {ref1}>Dashboard</Link>,
    },
  
    {
      key: 'sub1',
      label: (
        <CustomLabel ref={ref2}>
            Users Management
        </CustomLabel>
      ) ,
     
      icon: <UserOutlined />,
      children: [
        {
          key: '2',
          label: <Link to="/userlists"  >User List</Link>,
        }
      ],
    },
    {
      key: 'sub2',
      label:  (
        <CustomLabel ref={ref3}>
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
        <CustomLabel ref= {ref4}>
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
        <CustomLabel ref={ref5}>
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
        <CustomLabel ref={ref6}>
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
        <CustomLabel ref={ref7}>
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
        <CustomLabel ref={ref8}>
          Announcements
        </CustomLabel>
      ),
      icon: <NotificationOutlined />,
      children: [
        {
          key: '9',
          label: <Link to="/announcements">Announcements</Link>,
        }
      ],
    },
    {
      key: 'sub8',
      label:  (
        <CustomLabel ref={ref9}>
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
        <CustomLabel ref={ref10}>
          Sponsorship
        </CustomLabel>
      ),
      icon: <PoundCircleOutlined />,
      children: [
        {
          key: '13',
          label: <Link to="/relationships">Relatioship</Link>,
        },
        {
          key: '14',
          label: <Link to="/sponsorships">Sponsorship</Link>,
        },
        {
          key: '15',
          label: <Link to="/attendendships">Attendence</Link>,
        },
      ],
    },
    {
      key: 'sub10',
      label: (
        <CustomLabel ref={ref11}>
          Services
        </CustomLabel>
      ),
      icon: <LinkOutlined />,
      children: [
        {
          key: '16',
          label: <Link to="/servicegroups">Groups</Link>,
        },
        {
          key: '17',
          label: <Link to="/serviceindividuals">By One</Link>,
        },
        {
          key: '18',
          label: <Link to="/customerservices">Customer Service</Link>,
        },
      ],
    },
    {
      key: 'sub12',
      label: (
        <CustomLabel ref={ref12}>
          Survery
        </CustomLabel>
      ),
      icon: <NotificationOutlined />,
      children: [
        {
          key: '33',
          label: <Link to="/surveryrecords">Survery Record</Link>,
        }
      ],
    },
    {
      key: 'sub11',
      label: (
        <CustomLabel ref={ref13}>
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
  ];


  // end tour

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout theme="light">
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light' style={
        {
            height : "100vh",
            overflowY : "scroll",
            padding : "20px 0px"
        }
        }>
       
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            items={items}
            style={
              {
                fontSize: "13px"
              }
            }
          />
        
        <span onClick={() => setOpen(true)} style={
          {
            position: "fixed",
            right : "30px",
            bottom : "30px",
            fontSize : "20px",
            cursor: "pointer",
            zIndex : 100
          }
        }>
          <QuestionCircleOutlined />
        </span>
        
           
      
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >

          <div className='flex items-center justify-between px-5'>
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                fontSize: '16px',
                width: 30,
                height: 30,
                }}
              />
            </div>
            

            <div className='flex items-center'>
              
              <Allsearch/>
            </div>

            <div>Hello James</div>
          </div>
          
        </Header>
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
          <Userstable/>
        </Content>
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