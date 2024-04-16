import { Card, Row } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width:270px;
    height:140px;
    border-radius:10px;
    margin:10px;
`
export const StyleTotal = styled.div`
color: #212b36;
font-size:24px;
font-weight:700;
grid-area:auto;
line-height:36px;
`
export const StyleTitle = styled.div`
color:#919eab;
font-size:14px;
font-weight:600;
grid-area:auto;
line-height:22px;
margin:4px 0px 0px;
display: inline-block;
`
export const StyleRow = styled(Row)`
    align-items: center;
    justify-content: center;
`