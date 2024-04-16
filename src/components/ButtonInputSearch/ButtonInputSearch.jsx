import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton, bordered,
        backgroundColorButton = '#be1529',
        backgroundColorInput = '#fff',
        colorButton = '#fff'
    } = props
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderRadius: '0', }}
                {...props}
            />

            <ButtonComponent
                size={size}
                style={{
                    backgroundColor: backgroundColorButton,
                    borderRadius: '0',
                    border: !bordered && 'none'
                }}
                icon={<SearchOutlined color={colorButton} style={{ color: colorButton }} />}
                textbutton={textbutton}
                styleTextButton={{ color: colorButton }}
            />
        </div>
    )
}

export default ButtonInputSearch