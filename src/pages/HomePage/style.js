import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
display:flex;
align-items:center;
font-size:20px;
gap:24px;
justify-content:flex-start;
justify-item:center;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`
export const WrapperProducts = styled.div`
    display:flex;
    gap:80px;
    margin-top:20px;
    flex-wrap:wrap;
`
export const WrapperText = styled.div`
    margin-top: 10px;
    padding-top:20px;
    color: #000;
    display: inline;
    font-size:24px;
    font-weight: 600;
    grid-area: auto;
    line-height: 36px;
    text-align: left;
`
export const WrapperEventItem = styled.div`
    height: 400px;
    width: 350px;
    border: 1px;
    border-radius: 20px;
    background-color: red;
    position: relative;
    overflow: hidden;
`
export const WrapperProductFrame = styled.span`
    width: 1350px;
    height: fit-content;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    padding-bottom: 15px;
`
export const WrapperTittleText = styled.span`
    font-size: 40px;
    font-weight: bold;
    color: #E55604;
    margin-top: 10px;
    margin-bottom: 30px;
`