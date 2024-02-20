const path = require('path')
const configPath = path.join(__dirname, '..',  '.env')
const express = require('express')
const cors = require('cors')
require('colors') 
const Transaction = require('./models/Transaction.js')
const  mongoose = require('mongoose')

console.log(require('dotenv').config({path: configPath}))
// console.log(process.env.PORT)
// console.log(process.env.DB_HOST)
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json('test OK')
})

app.post('/api/transaction', (req, res) => {
    mongoose.connect(process.env.MONGO_URL)
    const { name, description, dateTime } = req.body
    console.log(name, description, dateTime)

     res.json(req.body)
})



app.listen(process.env.API_PORT, () => {
    console.log(`server is running on port: ${process.env.API_PORT}`.green.bold.italic)
    })
