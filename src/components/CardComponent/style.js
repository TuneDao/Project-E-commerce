
import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width:200px;
    & img {
        height:200px;
        width:200px;
    }
    position:relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor:${props => props.disabled ? 'not-allowed' : 'pointer'};
`

export const StyleNameProduct = styled.div`
font-weight: 600;
font-size: 16px;
line-height:16px;
color:rgb(56,56,61);
margin:8px;
`

export const WrapperReport = styled.div`
font-size: 13px;
color:rgb(128,128,137);
display:flex;
align-items: center;
`
export const WrapperPriceText = styled.div`
color: rgb(255,66,78);
font-size:16px;
font-weight: 600;
marign: 8px 0;
`

export const WrapperDiscountText = styled.div`
color: rgb(255,66,78);
font-size:11px;
font-weight:500;
`
export const WrapperStyleTextSell = styled.span`
    font-size:14px;
    line-height:24px;
    color: rgb(120,120,120);
`