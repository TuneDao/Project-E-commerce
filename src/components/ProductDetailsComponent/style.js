import { Card, Col, Image, InputNumber } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height:64px;
    width:64px;
`

export const WrapperStyleColSmall = styled(Col)`
    flex-basis:unset;
    display:flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    word-break:break-word;
`
export const WrapperStyleTextSell = styled.span`
    font-size:14px;
    line-height:24px;
    color: rgb(120,120,120);
`
export const WrapperPriceProduct = styled.div`
    background: rgb(250,250,250);
    border-radius:4px;
`

export const WrapperPriceTextProduct = styled.div`
    font-size:32px;
    line-height:40px;
    margin-right:8px;
    font-weight: 500;
    padding:10px;
    margin-top:10px;
`
export const WrapperAddressProduct = styled.div`
    span.address{
        text-decoration:underline;
        font-size:15px;
        line-height:24px;
        font-weight:500;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    };
    span.change-address{
        color: rgb(11,116,229);
        font-size:16px;
        line-height:24px;
        font-weight:500;
    }
`
export const WrapperQuantityProduct = styled.div`
        display:flex;
        gap:4px;
        align-items:center;
        width:160px;

`

export const WrapperInputNumber = styled(InputNumber)`
        &.ant-input-number.ant-input-number-sm {
            width:40px;
            border-top:none;
            border-bottom:none;
            .ant-input-number-handler-wrap{
            display:none !important;
        }   
        };
`
export const WrapperHeaderDescriptionProduct = styled.div`
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        color: rgb(39, 39, 42);  
        
`
export const WrapperInfoProduct = styled.div`
        font-weight: 400;
        font-size: 14px;
`

export const WrapperProducts = styled.div`
    display:flex;
    gap:12px;
    margin-top:20px;
    flex-wrap:wrap;
`
export const WrapperImageNews = styled(Image)`
    height:12px;
    width:12px;
`
export const StyleNameProduct = styled(Link)`
font-weight: 600;
font-size: 16px;
line-height:16px;
color:rgb(56,56,61);
margin:8px;
`
export const WrapperCardStyle = styled(Card)`
    width:650px;
        margin:10px;
    box-shadow:#000000 2px 2px 6px -2px;
    & img {
        height:200px;
        width:200px;
    }
    position:relative;
    cursor:'pointer';

`
export const WrapperDelPriceTextProduct = styled.del`
    font-size:20px;
    line-height:30px;
    margin-right:8px;
    font-weight: 500;
    padding:10px;
    margin-top:10px;
`