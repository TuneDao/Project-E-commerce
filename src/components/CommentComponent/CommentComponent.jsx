import React from 'react'

const CommentComponent = (props) => {
    const { datahref } = props
    return (
        <div style={{ margin: '8px' }}>
            <div className="fb-comments" data-href={datahref} data-width="" data-numposts="5"></div>
        </div>
    )
}

export default CommentComponent