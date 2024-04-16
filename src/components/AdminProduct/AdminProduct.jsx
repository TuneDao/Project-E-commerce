import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Select, Space, Table } from 'antd'
import {
    AppstoreAddOutlined, UploadOutlined,
    DeleteOutlined, EditOutlined,
    SearchOutlined
} from '@ant-design/icons'

import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hook/useMutationHook'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { convertPrice, getBase64, renderOptions, renderOptionsDetails } from '../../utils'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const user = useSelector((state) => state?.user)
    const [isLoadingUpdate, setisLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef(null);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        type: '',
        countInStock: '',
        discount: '',
        newType: '',
    })
    const [stateProduct, setStateProduct] = useState(inittial())

    const [stateProductDetails, setStateProductDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { name,
                price,
                description,
                rating,
                image,
                image1,
                image2,
                image3,
                image4,
                type,
                countInStock,
                discount } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                image1,
                image2,
                image3,
                image4,
                type,
                countInStock,
                discount
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = ProductService.updateProduct(
                id,
                token,
                { ...rests }
            )
            return res
        },
    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token } = data
            const res = ProductService.deleteProduct(
                id,
                token
            )
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const {
                token, ...ids } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token
            )
            return res
        },
    )


    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async () => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails(
                {
                    name: res?.data?.name,
                    price: res?.data?.price,
                    description: res?.data?.description,
                    rating: res?.data?.rating,
                    image: res?.data?.image,
                    image1: res?.data?.image1,
                    image2: res?.data?.image2,
                    image3: res?.data?.image3,
                    image4: res?.data?.image4,
                    type: res?.data?.type,
                    countInStock: res?.data?.countInStock,
                    discount: res?.data?.discount,
                }
            )
        }
        setisLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateProductDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setisLoadingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setisLoadingUpdate(true)
            fetchGetDetailsProduct()
        }
        setIsOpenDrawer(true)

    }

    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res?.data
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
    const { isLoading: isLoadingProducts, data: products } = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '20px', marginRight: '5px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'blue', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
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
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
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
                setTimeout(() => searchInput.current?.select(), 100);
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
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => <p>{convertPrice(text)}</p>,
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                console.log('value', { value, record })
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                console.log('value', { value, record })
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((products) => {
        return { ...products, key: products._id }
    })

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()

        } else if (isError) {
            message.error()
        }

    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()

        } else if (isErrorDeletedMany) {
            message.error()
        }

    }, [isSuccessDeletedMany])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()

        } else if (isErrorDeleted) {
            message.error()
        }

    }, [isSuccessDeleted])

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()

        } else if (isErrorUpdated) {
            message.error()
        }

    }, [isSuccessUpdated])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeteleProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            type: '',
            countInStock: '',
            discount: '',
        })
        form.resetFields()
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            type: '',
            countInStock: '',
        })
        form.resetFields()
    }
    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            image1: stateProduct.image1,
            image2: stateProduct.image2,
            image3: stateProduct.image3,
            image4: stateProduct.image4,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount,
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleOnChangeImage = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        })
    }
    const handleOnChangeImage1 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image1: file.preview,
        })
    }
    const handleOnChangeImage2 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image2: file.preview,
        })
    }
    const handleOnChangeImage3 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image3: file.preview,
        })
    }
    const handleOnChangeImage4 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image4: file.preview,
        })
    }

    const handleOnChangeImageDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        })
    }
    const handleOnChangeImageDetails1 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            image1: file.preview,
        })
    }

    const handleOnChangeImageDetails2 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            image2: file.preview,
        })
    }
    const handleOnChangeImageDetails3 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            image3: file.preview,
        })
    }
    const handleOnChangeImageDetails4 = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            image4: file.preview,
        })
    }


    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }
    const handleChangeSelectDetails = (value) => {
        setStateProductDetails({
            ...stateProductDetails,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <Button style={{ border: 'none' }} ><AppstoreAddOutlined style={{ fontSize: '25px' }} onClick={() => setIsModalOpen(true)} /></Button>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteManyProducts={handleDeleteManyProducts} columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <ModalComponent title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <LoadingComponent isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}>
                            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[{ required: true, message: 'Nhập loại sản phẩm!' }]}>

                            <Select
                                name='type'
                                // defaultValue="lucy"
                                style={{ width: 315 }}
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(typeProduct?.data)}
                            />
                        </Form.Item>
                        {stateProduct.type === 'add_type' && (
                            <Form.Item
                                label="Loại sản phẩm mới"
                                name="newType"
                                rules={[{ required: true, message: 'Nhập loại sản phẩm mới!' }]}>
                                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name='newType' />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Số lượng"
                            name="countInStock"
                            rules={[{ required: true, message: 'Nhập số lượng sản phẩm!' }]}>
                            <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Nhập mô tả sản phẩm!' }]}>
                            <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Giá tiền"
                            name="price"
                            rules={[{ required: true, message: 'Nhập giá tiền!' }]}>
                            <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[{ required: true, message: 'Vui lòng nhập đánh giá!' }]}>
                            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Giảm giá"
                            name="discount"
                            rules={[{ required: true, message: 'Vui lòng nhập giảm giá!' }]}>
                            <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                        </Form.Item>

                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImage} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProduct?.image && (
                                    <img src={stateProduct?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 1"
                            name="image1"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImage1} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProduct?.image1 && (
                                    <img src={stateProduct?.image1} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 2"
                            name="image2"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImage2} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProduct?.image2 && (
                                    <img src={stateProduct?.image2} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 3"
                            name="image3"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImage3} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProduct?.image3 && (
                                    <img src={stateProduct?.image3} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 4"
                            name="image4"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImage4} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProduct?.image4 && (
                                    <img src={stateProduct?.image4} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent>
            <DrawerComponent title='Chi Tiết Sản Phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <LoadingComponent isLoading={isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 19 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onUpdateProduct}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}>
                            <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[{ required: true, message: 'Nhập loại sản phẩm!' }]}>
                            <Select
                                name='type'
                                // defaultValue="lucy"
                                style={{ width: 315 }}
                                value={stateProduct.type}
                                onChange={handleChangeSelectDetails}
                                options={renderOptionsDetails(typeProduct?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="countInStock"
                            rules={[{ required: true, message: 'Nhập số lượng sản phẩm!' }]}>
                            <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả sản phẩm"
                            name="description"
                            rules={[{ required: true, message: 'Nhập mô tả sản phẩm!' }]}>
                            <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Giá tiền"
                            name="price"
                            rules={[{ required: true, message: 'Nhập giá sản phẩm!' }]}>
                            <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[{ required: true, message: 'Nhập đánh giá sản phẩm!' }]}>
                            <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Giảm giá"
                            name="discount"
                            rules={[{ required: true, message: 'Nhập giảm giá' }]}>
                            <InputComponent value={stateProductDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Chọn hình ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImageDetails} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProductDetails?.image && (
                                    <img src={stateProductDetails?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 1"
                            name="image1"
                            rules={[{ required: true, message: 'Chọn hình ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImageDetails1} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProductDetails?.image1 && (
                                    <img src={stateProductDetails?.image1} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 2"
                            name="image2"
                            rules={[{ required: true, message: 'Chọn hình ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImageDetails2} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProductDetails?.image2 && (
                                    <img src={stateProductDetails?.image2} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 3"
                            name="image3"
                            rules={[{ required: true, message: 'Chọn hình ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImageDetails3} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProductDetails?.image3 && (
                                    <img src={stateProductDetails?.image3} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh 4"
                            name="image4"
                            rules={[{ required: true, message: 'Chọn hình ảnh!' }]}>
                            <WrapperUploadFile onChange={handleOnChangeImageDetails4} maxCount={1}>
                                <Button icon={<UploadOutlined />} style={{ justifyContent: 'center' }}>Select file</Button>
                                {stateProductDetails?.image4 && (
                                    <img src={stateProductDetails?.image4} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </DrawerComponent>
            <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeteleProduct}>
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa sản phẩm này không ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default AdminProduct