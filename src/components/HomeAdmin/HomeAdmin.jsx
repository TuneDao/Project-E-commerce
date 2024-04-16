import React from 'react'
import { WrapperCardRevenueStyle, WrapperCardStyle, WrapperHeader, WrapperTitle } from './style'
import ic1 from '../../assets/images/ic_glass_users.png'
import ic2 from '../../assets/images/ic_glass_bag.png'
import ic3 from '../../assets/images/ic_glass_buy.png'
import AppWidgetSummary from '../AppWidgetSummary/AppWidgetSummary'
import { StyleRow } from '../AppWidgetSummary/style'
import PieChartComponent from '../OrderAdmin/PieChart'
import * as OrderService from '../../services/OrderService'
import * as UserService from '../../services/UserService'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Barchart from './Barchart'

const HomeAdmin = () => {
    const user = useSelector((state) => state?.user)

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const getAllUsers = () => {
        const res = UserService.getAllUsers(user?.access_token)
        return res
    }

    const getAllProducts = () => {
        const res = ProductService.getAllProduct()
        return res
    }


    const queryOrder = useQuery({ querykey: ['orders'], queryFn: getAllOrder })
    const { data: orders } = queryOrder

    const queryUser = useQuery({ querykey: ['users'], queryFn: getAllUsers })
    const { data: users } = queryUser

    const queryProduct = useQuery({ querykey: ['products'], queryFn: getAllProducts })
    const { data: products } = queryProduct

    return (
        <div>
            <WrapperHeader>Xin chào, Admin 👋</WrapperHeader>
            <StyleRow>
                <AppWidgetSummary
                    title={'Người dùng'}
                    icon={ic1}
                    total={Number(users?.length || 2)}
                />
                <AppWidgetSummary
                    title={'Số đơn hàng'}
                    icon={ic3}
                    total={Number(orders?.data?.length)}
                />
                <AppWidgetSummary
                    title={'Số sản phẩm'}
                    icon={ic2}
                    total={Number(products?.length || 14)}
                />
            </StyleRow>
            <StyleRow>
                <WrapperCardRevenueStyle>
                    <WrapperTitle>Thống kê theo tuần</WrapperTitle>
                    <Barchart data={orders?.data} />
                </WrapperCardRevenueStyle>
                <WrapperCardStyle >
                    <WrapperTitle>Phương thức thanh toán</WrapperTitle>
                    <PieChartComponent data={orders?.data} />
                </WrapperCardStyle>
            </StyleRow>

        </div>
    )
}

export default HomeAdmin