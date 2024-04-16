import React, { useEffect, useState } from 'react'
import {
  WrapperButtonMore, WrapperTittleText,
  WrapperProducts, WrapperProductFrame,
  WrapperTypeProduct,
  WrapperEventItem
} from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import banner1 from '../../assets/images/BlackFriday.jpg'
import banner2 from '../../assets/images/salechristmas.jpg'
import banner3 from '../../assets/images/banner1.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductService from '../../services/ProductService'
import sB1 from '../../assets/images/AutumnSale.jpg'
import sB2 from '../../assets/images/birthdaySale.png'
import sB3 from '../../assets/images/Chrismax.jpg'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hook/useDebounce'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { Row } from 'antd'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 1000)
  const [limit, setLimit] = useState(4)
  const [typeProducts, setTypeProducts] = useState([])

  const fecthProductAll = async (context) => {
    console.log(context)
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce],
    fecthProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })
  return (
    <LoadingComponent isLoading={isLoading}>
      <div className='body' style={{ width: '100%', background: '#efefef' }}>
        <div id="container" style={{ height: '100%', width: '100%', margin: '0 auto' }}>
          <SliderComponent arrImages={[banner1, banner2, banner3]} />
          <Row style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '180px', paddingRight: '180px', marginTop: '-150px', marginBottom: '20px' }}>
            <WrapperEventItem style={{ height: '350px', width: '350px', marginTop: '50px' }}>
              <div>
                <img src={sB1} alt="Event 1" style={{ alignItems: 'center', display: 'flex' }} />
              </div>
            </WrapperEventItem>

            <WrapperEventItem style={{ height: '450px', width: '350px' }}>
              <div>
                <img src={sB3} alt="Event 2" style={{ alignItems: 'center', display: 'flex' }} />
              </div>
            </WrapperEventItem>

            <WrapperEventItem style={{ height: '350px', width: '350px', marginTop: '50px' }} >
              <div>
                <img src={sB2} alt="Event 2" style={{ alignItems: 'center', display: 'flex' }} />
              </div>
            </WrapperEventItem>
          </Row>
          <Row>
            <WrapperProductFrame style={{ flexDirection: 'column' }}>
              <WrapperTittleText>SẢN PHẨM</WrapperTittleText>
              <Row style={{ display: 'flex', flexWrap: 'wrap', width: '1200px', justifyContent: 'space-between', marginBottom: '10px' }}>
                <WrapperProducts>
                  {products?.data?.map((product) => {
                    return (
                      <CardComponent key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        selled={product.selled}
                        id={product._id}
                      />
                    )
                  })}
                </WrapperProducts>
              </Row>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <WrapperButtonMore
                  textbutton={isPreviousData ? 'LoadMore' : "Xem Thêm"} type="outline" styleButton={{
                    border: '1px solid rgb(11,116,229)', color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`,
                    width: '240px', height: '46px',
                    borderRadius: '4px', backgroundColor: 'white'
                  }}
                  disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                  styleTextButton={{ fontWeight: '500', color: products?.total === products?.data?.length }}
                  onClick={() => {
                    setLimit((prev) => prev + 4)
                  }}
                />
              </div>
            </WrapperProductFrame>
          </Row>

        </div>
      </div>
    </LoadingComponent>
  )
}

export default HomePage