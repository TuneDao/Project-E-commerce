import React, { useEffect, useState } from 'react'
import { Badge, Col, Popover } from 'antd'
import * as UserService from '../../services/UserService'
import {
    WrapperHeader,
    WrapperTextHeader,
    WrapperHeaderAccount,
    WrapperTextHeaderSmall,
    WrapperContentPopup
} from './style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slice/userSlice';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { searchProduct } from '../../redux/slice/productSlice';
import logo from '../../assets/images/LogoHP.png'
import DropDownComponent from '../DropdownComponent/DropdownComponent';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false, isHiddenCate = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const order = useSelector((state) => state.order)
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        localStorage.removeItem('access_token')
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>

            <WrapperContentPopup onClick={() => handlClickNavigate('profile')}>Thông tin của tôi</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handlClickNavigate('admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handlClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handlClickNavigate()}>Đăng Xuất</WrapperContentPopup>

        </div>
    )

    const handlClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
        setIsOpenPopup(false);
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
    return (
        <div>
            <WrapperHeader gutter={16} style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={6}>
                    <WrapperTextHeader to='/' >
                        <img src={logo} alt='logo' />
                    </WrapperTextHeader>
                </Col>
                {!isHiddenCate && (
                    <Col span={2}>
                        <div style={{ marginLeft: '-100px', marginRight: '10px' }}>
                            <DropDownComponent />
                        </div>
                    </Col>
                )}

                {!isHiddenSearch && (
                    <Col span={11}>
                        <ButtonInputSearch size="large"
                            textbutton="Tìm kiếm"
                            placeholder="Tìm kiếm sản phẩm..."
                            bordered={false}
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <LoadingComponent isLoading={loading}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img src={userAvatar} style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }} alt='avatar' ></img>
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click" open={isOpenPopup} >
                                        <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập / Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccount>
                    </LoadingComponent>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size='small' style={{ backgroundColor: '#F4CE14', color: '#000', fontWeight: '500' }}>
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall></WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div >
    )
}

export default HeaderComponent