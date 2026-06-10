const Product = require('../models/productModel')

const createProduct = async (req, res) => {
  try {
    const {name, category, price, stock} = req.body

    if (!name || !category || price === undefined || stock === undefined) {
      return res.status(400).json({
        message: 'Missing required fields',
      })
    }

    if (typeof price !== 'number' || isNaN(price)) {
      return res.status(400).json({
        message: 'Price must be a valid number',
      })
    }

    if (!Number.isInteger(stock) || stock <= 0) {
      return res.status(400).json({
        message: 'Stock must be a positive integer',
      })
    }

    const product = new Product({
      name,
      category,
      price,
      stock,
    })
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find()
    res.status(200).json({
      count: product.length,
      product,
    })
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({message: 'Product Not Found'})
    }
    res.status(200).json({product})
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!product) {
      return res.status(404).json({message: 'Product Not Found'})
    }
    res.status(200).json({product})
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({message: 'Product Not Found'})
    }
    res.status(200).json({product})
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
