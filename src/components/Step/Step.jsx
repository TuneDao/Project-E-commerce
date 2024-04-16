import { Steps } from 'antd'
import React from 'react'

const Step = ({ current = 0, items = [] }) => {
    const { Step } = Steps
    const description = 'this is the description'
    return (
        <Steps current={current}>
            {items.map((item) => {
                return (
                    <Step key={item.title} title={item.title} description={item.description} />
                )
            })}
        </Steps>

    )
}

export default Step