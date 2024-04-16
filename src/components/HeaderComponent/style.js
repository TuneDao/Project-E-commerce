import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
padding: 10px 120px;
background-color: #ff3945;
align-items: center;
gap:16px;
flex-wrap: nowrap;
`
export const WrapperTextHeader = styled(Link)`
font-size: 18px;
color:#fff;
font-weight: bold;
text-align: left;
& :where(.css-dev-only-do-not-override-pr0fja) a:hover{
    color: #fff;
    text-decoration: none;
}
`
export const WrapperHeaderAccount = styled.div`
display:flex;
align-items: center;
color:#fff;
gap:10px;
font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
font-size: 12px;
color:#fff;
white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgba(26, 148, 255);
    }
`