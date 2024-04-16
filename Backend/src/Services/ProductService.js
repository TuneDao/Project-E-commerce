const Product = require("../Models/ProductModel");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, image1, image2, image3, image4, type, price, countInStock, rating, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({ name: name })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product already',
                })
            }
            const newProduct = await Product.create({
                name,
                image, image1, image2, image3, image4,
                countInStock: Number(countInStock),
                type,
                price,
                rating,
                description,
                discount: Number(discount)
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'Successfully created',
                    data: newProduct
                })
            }

        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined',
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Successfully created',
                data: updateProduct
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined',
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Deleted the product'
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Deleted the product'
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allproduct = [];
            if (filter) {
                const label = filter[0]
                const allproductFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Successfully retrieved all products',
                    data: allproductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allproductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Successfully retrieved all products',
                    data: allproductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allproduct = await Product.find()
            } else {
                allproduct = await Product.find().limit(limit).skip(page * limit)
            }
            resolve({
                status: 'OK',
                message: 'Successfully retrieved all products',
                data: allproduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}


const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Successfully retrieved all products',
                data: allType
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}


const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                })
            }
            resolve({
                status: 'OK',
                message: 'Successfully',
                data: product
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}
