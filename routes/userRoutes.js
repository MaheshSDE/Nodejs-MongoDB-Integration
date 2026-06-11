const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

const {registerUser, loginUser} = require('../controllers/authController')
const {authenticateToken} = require('../middlewares/authenticateToken')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', authenticateToken, getAllUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
