const User = require('../models/userModel')

const createUser = async (req, res) => {
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

    const user = new User({
      name,
      email,
      password,
      role,
      isActive,
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(401).json({message: err.message})
  }
}

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json({
      count: user.length,
      user,
    })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const getUser = async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({message: 'User Not Found'})
    }
    res.status(200).json({
      user,
    })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!user) {
      return res.status(404).json({message: 'User Not Found'})
    }
    res.status(200).json({
      user,
    })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({message: 'User Not Found'})
    }
    res.status(200).json({
      user,
    })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

module.exports = {createUser, getAllUsers, getUser, updateUser, deleteUser}
