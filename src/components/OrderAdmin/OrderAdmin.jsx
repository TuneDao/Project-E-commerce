import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { SearchOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { useQuery } from '@tanstack/react-query'
import { convertPrice } from '../../utils'
import { useSelector } from 'react-redux'
import * as OrderService from '../../services/OrderService'
import { orderContent } from '../../content'
import PieChartComponent from './PieChart'

const OrderAdmin = () => {
    const user = useSelector((state) => state?.user)


    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryOrder = useQuery({ querykey: ['orders'], queryFn: getAllOrder })
    const { isLoading: isLoadingOrder, data: orders } = queryOrder

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });


    const columns = [
        {
            title: 'STT',
            dataIndex: 'serialNumber',
            render: (text, record, index) => {
                const currentPage = 1; // Thay thế bằng trang hiện tại của bạn
                const pageSize = 10; // Thay thế bằng kích thước trang của bạn

                return ((currentPage - 1) * pageSize) + index + 1;
            },
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'userName',
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            ...getColumnSearchProps('address')
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            ...getColumnSearchProps('isPaid')
        },
        {
            title: 'Giao hàng',
            dataIndex: 'isDelivered',
            ...getColumnSearchProps('isDelivered')
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            ...getColumnSearchProps('paymentMethod')
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            render: (text) => <p>{convertPrice(text)}</p>
        },
    ];
    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        console.log(order)
        return {
            ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order.shippingAddress?.phone,
            address: order?.shippingAddress?.address, paymentMethod: orderContent.payment[order?.paymentMethod],
            isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán', isDelivered: order?.isDelivered ? 'Đã giao' : 'Chưa giao'
        }
    })

    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingOrder} data={dataTable} />
            </div>
        </div>
    )
}

export default OrderAdmin 