// index.js is the entry point for backend
require("dotenv").config();
const express = require('express')
const app = express()
// const port =  process.env.port || 3000
const port =  3000
const connectToMongo = require('./db/connect')
const cors = require('cors')
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectToMongo()

app.use(express.json()) //  console.log(req.body) prints undefined if this middleware is not used

app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/cart',require('./routes/cart'))

app.listen(port, () => {
  console.log(`Compare Craft listening on port http://localhost:${port}`)

})