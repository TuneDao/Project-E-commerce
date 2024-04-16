import React from 'react'

const LikeComponent = (props) => {
    const { datahref } = props
    return (
        <div style={{ margin: '8px' }}>
            <div className="fb-like" data-href={datahref} data-width="" data-layout="" data-action="" data-size="" data-share="true">
            </div>
        </div>


    )
}

export default LikeComponent