
import { Modal, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color:#000,
    font-size: 20px;
    font-weight: 600;
`
export const WrapperModalForm = styled(Modal)`
    & .ant-modal-footer{
        display:none;
    }
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        width: 60px;
        height: 60px;
        border-radius: 50%; 
    }
    & .ant-upload-list-item-container {
        display: none;
    }
`