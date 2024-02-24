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

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL)
    const { name, price, description, dateTime } = req.body
    console.log(name, description, dateTime)

    const transaction = await Transaction.create({ name, price, description, dateTime })
     res.json(transaction)
})

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL)
    const list  = await Transaction.find()
    res.json(list)
})

if(process.env.API_PORT) {
    app.listen(process.env.API_PORT, () => {
        console.log(`server is running on port: ${process.env.API_PORT}`.green.bold.italic)
        })
}

module.exports = app