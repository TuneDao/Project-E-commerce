import React, { useEffect, useState } from 'react'
import { UnderLine, WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'
import * as ProductService from '../../services/ProductService'
import TypeProduct from '../TypeProduct/TypeProduct'

const NavBarComponent = () => {
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

    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };

    const onChange = () => {

    }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    const textStyle = {
                        color: hoveredIndex === index ? '#E5D283' : 'black',
                        fontSize: hoveredIndex === index ? '16px' : '14px',
                        fontWeight: hoveredIndex === index ? 'bold' : 'normal',
                        cursor: 'pointer',
                    };

                    return (
                        <WrapperTextValue
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={textStyle}>
                            {option}
                        </WrapperTextValue>
                    );
                });
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onChange={onChange}>
                        {options.map((option) => {
                            return <Checkbox value={option.value}>{option.label}</Checkbox>
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '14px' }} disabled defaultValue={option} />
                            <WrapperTextValue>{`từ ${option} sao`}</WrapperTextValue>
                        </div>
                    )

                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                    )

                })

            default:
                return {}
        }

    }
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <WrapperLableText>Danh Mục</WrapperLableText>
            <WrapperContent>
                {typeProducts.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </WrapperContent>
            <UnderLine />
            <WrapperLableText>Khách hàng đánh giá</WrapperLableText>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent