
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button , Col, Row, Space , ConfigProvider  } from 'antd';

import PointTopUp from '../models/userPointManagement/PointTopUp';
import PointFreeze from '../models/userPointManagement/PointFreeze';
import PointUnfreeze from '../models/userPointManagement/PointUnfreeze';
import PointDeduct from '../models/userPointManagement/PointDeduct';

export default function UserPointManagement(){
    return (
        <>
            <Row gutter={16} className='text-center'>
                <Col span={6}>
                    <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Avaliable Point </span>
                        <div className='mt-3 text-lg'>
                            100000
                        </div>
                    </div>
                    
                </Col>
                <Col span={6}>
                    <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Transaction Point </span>
                        <div className='mt-3 text-lg'>
                            900
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Freezed Point </span>
                        <div className='mt-3 text-lg'>
                            100000
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                <div className='py-5 bg-blue-100 rounded'>
                        <span className='text-lg'>Deduct Point </span>
                        <div className='mt-3 text-lg'>
                            100000
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="mt-5 flex justify-center">
                <Space>
                
                    <PointTopUp/>
                    <PointFreeze/>
                    <PointUnfreeze/>
                    <PointDeduct/>
                    
                </Space>
            </div>
        </>
    )
}