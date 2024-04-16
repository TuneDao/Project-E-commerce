import AdminPage from "../pages/AdminPaage/AdminPage"
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage"
import HomePage from "../pages/HomePage/HomePage"
import MyOrder from "../pages/MyOrderPage/MyOrder"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess"

import PaymentPage from "../pages/PaymentPage/PaymentPage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"

import ProfilePage from "../pages/Profile/ProfilePage"
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"

export const routes = [{
    path: '/',
    page: HomePage,
    isShowHeader: true,
},
{
    path: '/order',
    page: OrderPage,
    isShowHeader: true,
},
{
    path: '/my-order',
    page: MyOrder,
    isShowHeader: true,
},
{
    path: '/details-order/:id',
    page: DetailsOrderPage,
    isShowHeader: true,
},
{
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true,
},
{
    path: '/orderSuccess',
    page: OrderSuccess,
    isShowHeader: true,
},
{
    path: '/product/:type',
    page: TypeProductPage,
    isShowHeader: true,
},
{
    path: '/sign-in',
    page: SignInPage,
    isShowHeader: false,
},
{
    path: '/sign-up',
    page: SignUpPage,
    isShowHeader: false,
},
{
    path: '/product-details/:id',
    page: ProductDetailsPage,
    isShowHeader: true,
},
{
    path: '/profile-user',
    page: ProfilePage,
    isShowHeader: true,
},
{
    path: '/system/admin',
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
},
{
    path: '*',
    page: NotFoundPage
},
]
