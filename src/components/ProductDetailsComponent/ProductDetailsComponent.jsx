import { Col, Image, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    WrapperStyleImageSmall, WrapperStyleColSmall, WrapperStyleNameProduct,
    WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct,
    WrapperAddressProduct,
    WrapperInputNumber,
    WrapperQuantityProduct,
    WrapperHeaderDescriptionProduct,
    WrapperInfoProduct,
    WrapperCardStyle,
    WrapperImageNews,
    StyleNameProduct,
    WrapperDelPriceTextProduct
} from './style'
import { PlusOutlined, MinusOutlined, StarFilled, ShoppingCartOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slice/orderSlice'
import { convertPrice, initFacebookSDK } from '../../utils'
import LikeComponent from '../LikeComponent/LikeComponent'
import CommentComponent from '../CommentComponent/CommentComponent'


const ProductDetailsComponent = ({ idProduct }) => {
    useEffect(() => {
        initFacebookSDK()
    })
    const [numProduct, setNumProduct] = useState(1)
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            setNumProduct(numProduct - 1)
        }
    }
    const navigate = useNavigate()
    const location = useLocation()
    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct],
        fetchGetDetailsProduct, { enabled: !!idProduct })
    console.log('ProductDetails', productDetails)

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [numProduct])


    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        image1: productDetails?.image1,
                        image2: productDetails?.image2,
                        image3: productDetails?.image3,
                        image4: productDetails?.image4,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
    const handleToCart = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        image1: productDetails?.image1,
                        image2: productDetails?.image2,
                        image3: productDetails?.image3,
                        image4: productDetails?.image4,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                },
                    navigate('/order')
                ))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
    var rating = 0;
    return (
        <LoadingComponent isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5' }}>
                    <Image src={productDetails?.image} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColSmall span={4}>
                            <WrapperStyleImageSmall src={productDetails?.image1} alt="image small" preview={true} />
                        </WrapperStyleColSmall>
                        <WrapperStyleColSmall span={4}>
                            <WrapperStyleImageSmall src={productDetails?.image2} alt="image small" preview={true} />
                        </WrapperStyleColSmall>
                        <WrapperStyleColSmall span={4}>
                            <WrapperStyleImageSmall src={productDetails?.image3} alt="image small" previe w={true} />
                        </WrapperStyleColSmall>
                        <WrapperStyleColSmall span={4}>
                            <WrapperStyleImageSmall src={productDetails?.image4} alt="image small" preview={true} />
                        </WrapperStyleColSmall>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name} </WrapperStyleNameProduct>
                    <div>
                        <Rate allowHalf defaultValue={Number(productDetails?.rating)} value={productDetails?.rating} />
                        <WrapperStyleTextSell>| Đã bán được {productDetails?.selled || 1000}</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct style={{ color: 'red' }}>
                            {convertPrice(productDetails?.price - (productDetails?.price * (productDetails?.discount / 100)))}
                            <WrapperDelPriceTextProduct style={{ color: '#6d6e72' }}>
                                {convertPrice(productDetails?.price)}
                            </WrapperDelPriceTextProduct>
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span>
                        <span className='change-address'> - Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <WrapperHeaderDescriptionProduct>
                        <div style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', padding: '10px 0 20px' }}>
                            Thông tin sản phẩm
                            <WrapperInfoProduct>
                                {productDetails?.description}
                            </WrapperInfoProduct>
                        </div>
                    </WrapperHeaderDescriptionProduct>

                    <LikeComponent datahref={"https://developers.facebook.com/docs/plugins/"} />
                    <div style={{ margin: '10px 0 20px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', padding: '10px 0 20px' }}>
                        <div style={{ marginBottom: '6px' }}>Số lượng</div>
                        <WrapperQuantityProduct>
                            <button style={{ border: 'none', background: '#fff' }}>
                                <ButtonComponent style={{ borderRadius: '0px', justifyContent: 'center', }} icon={<MinusOutlined style={{ color: '#000', fontSize: '10px' }} size='12px' onClick={() => handleChangeCount('decrease')} />}></ButtonComponent>
                            </button>
                            <WrapperInputNumber defaultValue={1} onChange={onChange} value={numProduct} size='small' style={{ borderRadius: '0px', justifyContent: 'center', }} />
                            <button style={{ border: 'none', background: '#fff' }}>
                                <ButtonComponent style={{ borderRadius: '0px', justifyContent: 'center', }} icon={<PlusOutlined style={{ color: '#000', fontSize: '10px' }} size='12px' onClick={() => handleChangeCount('increase')} />}></ButtonComponent>
                            </button>
                        </WrapperQuantityProduct>
                    </div>
                    <div>
                        <ButtonComponent
                            size={20}
                            style={{
                                backgroundColor: 'rgb(255,57,69)',
                                height: '48px',
                                width: '150px'
                            }}
                            onClick={handleToCart}
                            textbutton={'Mua ngay'}
                            styleTextButton={{ color: '#fff', fontWeight: '700' }}
                        >
                        </ButtonComponent>
                        <ButtonComponent
                            size={20}
                            style={{
                                backgroundColor: '#FCC8C8',
                                height: '48px',
                                width: '220px',
                                marginLeft: '30px',
                                border: '1px solid #FF0000'
                            }}
                            onClick={handleAddOrderProduct}
                            textbutton={<><ShoppingCartOutlined style={{ fontSize: '18px' }} /> Thêm vào giỏ hàng</>}
                            styleTextButton={{ color: '#FF0000', fontWeight: '700' }}
                        >
                        </ButtonComponent>

                        {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm hết hàng</div>}
                    </div>
                </Col>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={11} style={{ borderRight: '1px solid #e5e5e5' }}>
                        <CommentComponent datahref={"https://developers.facebook.com/docs/plugins/comments#configurator"} width="1272" />
                    </Col>
                    <Col span={13} style={{ paddingLeft: '10px' }}>
                        <WrapperStyleNameProduct>Đánh giá về sản phẩm {productDetails?.name} </WrapperStyleNameProduct>
                        <Row>
                            <Col span={5}></Col>
                            <Col span={6} style={{ margin: '20px' }}>
                                <WrapperPriceTextProduct style={{ color: 'red', fontSize: '36px', marginLeft: '25px' }}>{productDetails?.rating}/5</WrapperPriceTextProduct>
                                <Rate allowHalf defaultValue={Number(productDetails?.rating)} value={productDetails?.rating} />
                                <WrapperPriceTextProduct style={{ fontSize: '14px', margin: '0px', marginLeft: '25px' }}>đánh giá</WrapperPriceTextProduct>
                            </Col>
                            <Col span={6} style={{ margin: '20px' }}>
                                <Row>
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px' }}>5</WrapperPriceProduct>
                                    <StarFilled style={{ color: 'yellow', fontSize: '18px', paddingLeft: '5px' }} />
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px', fontWeight: '500' }}>({productDetails?.rating == 5 ? rating = rating + 1 : 0}) đánh giá</WrapperPriceProduct>

                                </Row>
                                <Row>
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px' }}>4</WrapperPriceProduct>
                                    <StarFilled style={{ color: 'yellow', fontSize: '18px', paddingLeft: '5px' }} />
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px', fontWeight: '500' }}>({productDetails?.rating == 4 ? rating = rating + 1 : 0}) đánh giá</WrapperPriceProduct>

                                </Row>
                                <Row>
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px' }}>3</WrapperPriceProduct>
                                    <StarFilled style={{ color: 'yellow', fontSize: '18px', paddingLeft: '5px' }} />
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px', fontWeight: '500' }}>({productDetails?.rating == 3 ? rating = rating + 1 : 0}) đánh giá</WrapperPriceProduct>

                                </Row>
                                <Row>
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px' }}>2</WrapperPriceProduct>
                                    <StarFilled style={{ color: 'yellow', fontSize: '18px', paddingLeft: '5px' }} />
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px', fontWeight: '500' }}>({productDetails?.rating == 2 ? rating = rating + 1 : 0}) đánh giá</WrapperPriceProduct>
                                </Row>
                                <Row>
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px' }}>1</WrapperPriceProduct>
                                    <StarFilled style={{ color: 'yellow', fontSize: '18px', paddingLeft: '5px' }} />
                                    <WrapperPriceProduct style={{ fontSize: '15px', margin: '3px', fontWeight: '500' }}>({productDetails?.rating == 1 ? rating = rating + 1 : 0}) đánh giá</WrapperPriceProduct>
                                </Row>
                            </Col>
                            <Col span={3}></Col>
                        </Row>
                        <Col>
                            <Row style={{ borderTop: '1px solid #e5e5e5' }}>
                                <WrapperStyleNameProduct>Tin tức công nghệ</WrapperStyleNameProduct>
                                <Col>
                                    <WrapperCardStyle style={{ cursor: 'pointer', padding: '10px' }}>
                                        <WrapperImageNews style={{ width: '70px', height: '64px' }} src='https://file.hstatic.net/200000722513/file/annotated-links-image_c193e8eaf90e4a81979daa4912f3ed02.jpg' preview={false} />
                                        <StyleNameProduct style={{ fontSize: '15px', margin: '10px', fontWeight: '500', display: 'inline' }} to='https://gearvn.com/blogs/cong-nghe/chi-voi-3-trieu-do-ban-da-co-the-ngoi-lai-con-robot-bien-hinh-cua-rie'>
                                            Chỉ với 3 triệu đô, bạn sẽ được lái robot biến hình của riêng mình
                                        </StyleNameProduct>
                                    </WrapperCardStyle>
                                    <WrapperCardStyle style={{ cursor: 'pointer', padding: '10px' }}>
                                        <WrapperImageNews style={{ width: '70px', height: '64px' }} src='https://file.hstatic.net/200000722513/file/97r6xsvu9ay8d9nowv73vk_2970169e90cb454f849dc81f10b9b950.jpg' preview={false} />
                                        <StyleNameProduct style={{ fontSize: '15px', margin: '10px', fontWeight: '500', display: 'inline' }} to='https://gearvn.com/blogs/cong-nghe/lo-anh-hop-dung-card-nvidia-rtx-voi-ten-goi-rat-nuc-cuoi'>
                                            Lộ ảnh hộp đựng card Nvidia RTX với tên gọi rất nực cười</StyleNameProduct>
                                    </WrapperCardStyle>
                                    <WrapperCardStyle style={{ cursor: 'pointer', padding: '10px' }}>
                                        <WrapperImageNews style={{ width: '70px', height: '64px' }} src='https://file.hstatic.net/200000722513/file/ciz7kym5tjhbm7ej8bb2nd_31dc338d22124deb9b938ea0aeaf3194.jpg' preview={false} />
                                        <StyleNameProduct style={{ fontSize: '15px', margin: '10px', fontWeight: '500', display: 'inline' }} to='https://gearvn.com/blogs/cong-nghe/apple-tuyen-bo-8gb-ram-cua-macbook-pro-m3-khong-thua-gi-16gb-tren-pc'>
                                            Apple tuyên bố 8GB RAM của MacBook Pro M3 cũng như 16GB trên PC</StyleNameProduct>
                                    </WrapperCardStyle>

                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Row>
        </LoadingComponent >
    )
}

export default ProductDetailsComponent