import { message } from "antd"

const success = (mes = 'Success') => {
    message.success(mes)
}
const error = (mes = 'Error') => {
    message.error(mes)
}
const warnning = (mes = 'Warning') => {
    message.warning(mes)
}
export { success, error, warnning }