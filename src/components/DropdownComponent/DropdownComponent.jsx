import React, { useEffect, useState } from 'react'
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space, } from 'antd'
import TypeProduct from '../TypeProduct/TypeProduct';
import * as ProductService from '../../services/ProductService'


const DropDownComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
    const menuItems = typeProducts.map((typeProduct) => ({
        key: typeProduct,
        label: (
            <TypeProduct name={typeProduct} key={typeProduct} />

        ),
    }));
    return (
        <div style={{ display: 'flex', paddingLeft: '20px', paddingRight: '10px', marginTop: '10px', marginBottom: '10px', marginLeft: '15px' }}>
            <div style={{ backgroundColor: '#be1529', borderRadius: '5px', height: '40px', width: '100px' }}>
                <Dropdown menu={{ items: menuItems }} overlayStyle={{ width: '130px' }}>
                    <a onClick={(e) => e.preventDefault()} style={{ height: '40px', fontSize: '14px', lineHeight: '1', display: 'flex', justifyContent: 'center' }}>
                        <Space style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>
                            <MenuOutlined />
                            <div style={{ fontSize: '15px' }}>Danh mục</div>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}

export default DropDownComponent