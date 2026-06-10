const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const app = express()
dotenv.config()

app.use(express.json())

//User Collection API
app.use('/users/', userRoutes)

//Product Collection API
app.use('/products/', productRoutes)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Db was Connected Successfully...!')
  })
  .catch(error => {
    console.log(`Error : ${error}`)
  })

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`)
})
