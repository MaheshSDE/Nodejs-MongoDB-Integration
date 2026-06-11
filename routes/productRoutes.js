const express = require('express')
const router = express.Router()

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')
const {authenticateToken} = require('../middlewares/authenticateToken')

router.post('/add-product', createProduct)
router.get('/', authenticateToken, getAllProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
