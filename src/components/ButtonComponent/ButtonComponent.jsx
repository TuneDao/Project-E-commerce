import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, textbutton, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton
            }}
            size={size}
            {...rests}

        >
            <span style={styleTextButton}>{textbutton}</span>
        </Button>
    )
}

export default ButtonComponent