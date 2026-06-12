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
const {authorizeRoles} = require('../middlewares/authorizeRoles')

router.post(
  '/add-product',
  authenticateToken,
  authorizeRoles(['seller']),
  createProduct,
)
router.get('/', authenticateToken, getAllProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
