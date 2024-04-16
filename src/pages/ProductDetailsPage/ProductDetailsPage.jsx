import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div style={{ width: '100%', background: '#efefef', }}>
            <div style={{ padding: '0 120px', height: '100%' }}>
                <h5><span onClick={() => { navigate('/') }} style={{ cursor: 'pointer', fontWeight: '700' }}>Trang chủ | Chi tiết sản phẩm</span></h5>
                <div>
                    <ProductDetailsComponent idProduct={id} />
                </div>
            </div>
        </div>

    )
}

export default ProductDetailsPage