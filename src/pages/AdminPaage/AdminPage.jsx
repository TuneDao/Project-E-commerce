import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, InboxOutlined, ShoppingCartOutlined, LineChartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';
import HomeAdmin from '../../components/HomeAdmin/HomeAdmin';
const AdminPage = () => {
    const items = [
        getItem('Trang chủ', 'home', <LineChartOutlined />),
        getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
        getItem('Sản phẩm', 'product', <InboxOutlined />),
        getItem('Người dùng', 'user', <UserOutlined />),
    ];

    const [keyselected, setKeySelected] = useState('')
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />
            case 'product':
                return <AdminProduct />
            case 'order':
                return <OrderAdmin />
            case 'home':
                return <HomeAdmin />
            default:
                return null
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    console.log('keySelected', keyselected)
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart isHiddenCate />
            <div style={{ display: 'flex', }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '6px 3px 5px #ccc',
                        height: '100vh',

                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                    {renderPage(keyselected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage