import React from 'react'
import { WrapperFooter, WrapperTittle } from './style'
import { FacebookOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col } from 'antd'
import PTTT1 from '../../assets/images/paypal.jpg'
import PTTT2 from '../../assets/images/tienMat.jpg'

const FooterComponent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <WrapperFooter style={{ display: 'flex' }}>
                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '40px', paddingLeft: '100px' }}>
                            <WrapperTittle>Về chúng tôi:</WrapperTittle>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', marginTop: '8px', cursor: 'pointer' }}>Giới thiệu.</span>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', cursor: 'pointer' }}>Tuyển dụng.</span>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '40px', paddingLeft: '100px' }}>
                            <WrapperTittle>Chính sách:</WrapperTittle>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', marginTop: '8px', cursor: 'pointer' }}>Chính sách bảo hành</span>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', cursor: 'pointer' }}>Chính sách thanh toán.</span>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', cursor: 'pointer' }}>Chính sách bảo mật.</span>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', cursor: 'pointer' }}>Chính sách giao hàng.</span>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '40px', paddingLeft: '100px' }}>
                            <WrapperTittle>Thông tin:</WrapperTittle>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', marginTop: '8px', cursor: 'pointer' }}>Hệ thống cửa hàng.</span>
                            <span style={{ fontSize: '15px', color: 'white', marginBottom: '18px', cursor: 'pointer' }}>Trung tâm bảo hành.</span>
                        </div>
                    </Col>

                    <Col span={6} >
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '40px', paddingLeft: '100px' }}>
                            <WrapperTittle>Liên hệ với chúng tôi:</WrapperTittle>
                            <div>
                                <FacebookOutlined style={{
                                    color: 'white',
                                    fontSize: '25px',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                    marginTop: '8px'
                                }} />
                                <span style={{ marginLeft: '8px', fontSize: '18px', color: 'white', cursor: 'pointer' }}>Facebook.</span>
                            </div>
                            <div>
                                <InstagramOutlined style={{
                                    color: 'white',
                                    fontSize: '25px',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                }} />
                                <span style={{ marginLeft: '8px', fontSize: '18px', color: 'white', cursor: 'pointer' }}>Instagram.</span>
                            </div>
                            <div>
                                <PhoneOutlined style={{
                                    color: 'white',
                                    fontSize: '25px',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                }} />
                                <span style={{ marginLeft: '8px', fontSize: '18px', color: 'white', cursor: 'pointer' }}>Phone.</span>
                            </div>
                        </div>
                    </Col>
                </WrapperFooter>

            </div>
            <div style={{ height: '100px', background: '#213555', display: 'flex', alignItems: 'center', paddingLeft: '100px' }}>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'white', fontFamily: 'Segoe UI' }}>Phương thức thanh toán: </span>
                <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    <img src={PTTT1} alt="Pay Pal" />
                </span>
                <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    <img src={PTTT2} alt="Tien mat" />
                </span>

            </div>
        </div>
    )
}

export default FooterComponent