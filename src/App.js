import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils';
import jwt_decode from "jwt-decode"
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slice/userSlice';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';

export function App() {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const user = useSelector((state) => state.user)
  useEffect(() => {
    setisLoading(true)
    const { storageData, decode } = handleDecoded()
    console.log(decode)
    if (decode?.id) {
      handleGetDetailsUser(decode?.id, storageData)
    }
    setisLoading(false)
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decode = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decode = jwt_decode(storageData)
    }
    return { decode, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decode } = handleDecoded()
    if (decode?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Beare ${data.access_token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))

  }
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <LoadingComponent isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </LoadingComponent>

    </div>
  )
}
export default App;
