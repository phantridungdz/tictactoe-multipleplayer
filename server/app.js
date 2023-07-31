const express = require('express')
require('dotenv').config()
require('./models/db')
const userRouter = require('./routes/user')

const User = require('./models/user')
const app = express()

// app.use((req, res, next) => {
//   reqq.on('data', chunl => {
//     const data = JSON.parse(chunk);
//     req.body = data
//   });
//   next();
// })
app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) =>{
  res.json({success: true, message: 'connected'})
})

app.listen(8000, () => {
  console.log('listening port 8000')
})