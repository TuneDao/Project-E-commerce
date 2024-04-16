// Barchart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Barchart = ({ data }) => {
    // Kiểm tra xem data có tồn tại
    if (!data) {
        return null; // hoặc một thông báo lỗi hoặc component rỗng tùy vào trường hợp sử dụng
    }

    // Xử lý dữ liệu để tính tổng doanh thu cho từng ngày trong tuần
    const revenueByDay = data.reduce((acc, order) => {
        const orderDate = new Date(order.createdAt);
        const dayOfWeek = orderDate.getDay(); // Ngày trong tuần (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)

        // Chuyển ngày thành tên ngày trong tuần
        const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = dayNames[dayOfWeek];

        acc[dayName] = (acc[dayName] || 0) + order.totalPrice;
        return acc;
    }, {});

    // Chuyển đổi dữ liệu thành mảng để truyền vào biểu đồ
    const chartData = Object.keys(revenueByDay).map(day => ({
        day,
        revenue: revenueByDay[day],
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Barchart;
