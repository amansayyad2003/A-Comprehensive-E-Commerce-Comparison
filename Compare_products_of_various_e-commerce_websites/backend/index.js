// index.js is the entry point for backend
const express = require('express')
const app = express()
const port = 3000
const connectToMongo = require('./db')
app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectToMongo()

app.use(express.json()) //  console.log(req.body) prints undefined if this middleware is not used

app.use('/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Compare Craft listening on port http://localhost:${port}`)
})