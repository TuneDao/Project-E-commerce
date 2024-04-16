import React from 'react'
import { StyleTitle, StyleTotal, WrapperCardStyle } from './style'
import { Col, Row } from 'antd'

const AppWidgetSummary = (props) => {
    const { title, total, icon } = props

    return (
        <Row>
            <WrapperCardStyle
                hoverable
                style={{ width: 240, }}
                bodyStyle={{ padding: '10px', display: 'flex', padding: '35px 15px 0px 30px' }}
            >
                <Col span={10}>
                    <img src={icon}
                        style={{
                            height: '64px',
                            width: '64px',
                        }} />
                </Col>
                <Col span={12}>
                    <StyleTotal>
                        {total}
                    </StyleTotal>
                    <Row>
                        <StyleTitle>
                            {title}
                        </StyleTitle>
                    </Row>

                </Col>
            </WrapperCardStyle>
        </Row>

    )
}

export default AppWidgetSummary