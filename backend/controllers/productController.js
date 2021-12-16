import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Товар не найден')
  }
})


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Товар удален' })
  } else {
    res.status(404)
    throw new Error('Товар не найден')
  }
})


const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Название',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Категория',
    countInStock: 0,
    description: 'Описание',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Товар не найден')
  }
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
