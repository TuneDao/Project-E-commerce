import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperCategoryItem } from './style'

const CategoryItemComponent = ({ name }) => {
    const navigate = useNavigate()
    const handleNavigatetype = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u03FF]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }
    return (
        <WrapperCategoryItem style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigatetype(name)}>{name}</WrapperCategoryItem>
    )
}

export default CategoryItemComponent