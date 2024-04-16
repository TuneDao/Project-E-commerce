
import React from 'react'
import {
    StyleNameProduct, WrapperDiscountText,
    WrapperPriceText, WrapperReport, WrapperStyleTextSell,
    WrapperCardStyle
} from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'
import logo from '../../assets/images/verifyCheck.png'

const CardComponent = (props) => {
    const { countInStock, description, image, name, rating, price, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 240, }}
            bodyStyle={{ padding: '10px' }}
            onClick={() => handleDetailsProduct(id)}
            cover={<img alt="example" src={image} />}
        >
            <img
                src={logo}
                style={{
                    width: "68px",
                    height: "14px",
                    position: "absolute",
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: "3px",
                }}
            />
            <StyleNameProduct>
                {name}
            </StyleNameProduct>
            <WrapperReport>
                <span>
                    <span>{rating}</span> <StarFilled style={{ color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell> | đã bán {selled || 1000}</WrapperStyleTextSell>
            </WrapperReport>
            <WrapperPriceText>
                {convertPrice(price)}
                <WrapperDiscountText>- {discount || 5}%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent