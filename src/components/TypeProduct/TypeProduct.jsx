import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperTextValue } from './style'

const TypeProduct = ({ name }) => {
    const navigate = useNavigate()
    const handleNavigatetype = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u03FF]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    const textStyle = {
                        color: hoveredIndex === index ? '#e30019' : 'black',
                        fontSize: hoveredIndex === index ? '16px' : '14px',
                        fontWeight: hoveredIndex === index ? 'bold' : '500',
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
            default:
                return {}
        }

    }
    return (
        renderContent('text', [<div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigatetype(name)}>{name}</div>])
    )
}

export default TypeProduct