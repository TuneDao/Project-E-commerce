import React from 'react'
import { Lable, WrapperInfo, WrapperLeft, WrapperValue, WrapperItemOrder, WrapperCountOrder, WrapperItemOrderInfo } from './style'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { convertPrice } from '../../utils'
import { useLocation } from 'react-router-dom'
import { orderContent } from '../../content'

const OrderSuccess = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  const { state } = location
  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh', justifyContent: 'space-between' }}>
      <LoadingComponent isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Đơn hàng đặt thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh giao hàng</Lable>
                  <WrapperValue>
                    <span value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContent[state?.delivery]}</span> Giao hàng tiết kiệm</span>
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContent.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder>
                      <div style={{ width: '390px', display: 'flex', alignItems: 'center' }}>
                        <img src={order?.image} style={{ width: '77px', height: '70px', objectFit: 'center', padding: '10px' }} />
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>

                      </div>
                    </WrapperItemOrder>
                  )
                })}
                <WrapperItemOrderInfo>
                  <span>
                    <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
                  </span>
                </WrapperItemOrderInfo>
              </WrapperInfo>
            </WrapperLeft>
          </div>
        </div>
      </LoadingComponent>

    </div>
  )
}
export default OrderSuccess