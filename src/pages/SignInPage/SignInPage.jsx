import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/Inputform/InputForm'
import imagelogo from '../../assets/images/AutumnSale.jpg'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { Image } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useMutationHooks } from '../../hook/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slice/userSlice'
import * as message from '../../components/Message/Message'


const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const location = useLocation()
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const mutation = useMutationHooks(
        (data) => UserService.loginUser(data)
    )

    const { data, isLoading, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            console.log('location', location)
            if (location?.state) {
                message.error('Tài khoản, mật khẩu không chính xác!')
                navigate(location?.state)
            } else {
                message.success('Đăng nhập thành công!')
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decode = jwt_decode(data?.access_token)
                if (decode?.id) {
                    handleGetDetailsUser(decode?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const handleSignIn = () => {
        mutation.mutate({ email, password })
    }
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1> Xin chào</h1>
                    <p>Đăng nhập tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}>{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm placeholder="password" type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnChangePassword} />
                    </div>
                    {data?.status === 'ERROR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <LoadingComponent isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textbutton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </LoadingComponent>
                    <p>Quên mật khẩu</p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imagelogo} preview={false} alt='image-log' />
                </WrapperContainerRight>
            </div>
        </div>

    )
}

export default SignInPage