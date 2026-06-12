const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const {name, email, password, role, isActive} = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All required fields must be filled',
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const existingUser = await User.findOne({email})

    if (!emailRegex.test(email) || password.length < 6 || existingUser) {
      return res.status(400).json({
        message:
          'Email must be unique and valid. Password must meet the criteria.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isActive,
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(401).json({message: err.message})
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (!user) {
    return res.status(400).sen('Invalid user')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    return res.status(400).send('Invalid Password')
  }
  const payload = {id: user._id, role: user.role}
  const jwtToken = jwt.sign(payload, process.env.SECRETE_TOKEN, {
    expiresIn: '1h',
  })
  res.status(200).send({jwtToken})
}

module.exports = {registerUser, loginUser}
