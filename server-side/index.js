const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.get('/', (req, res)=>{
  res.send('gadget Shop is Running')
})

app.listen(port , ()=>{
  console.log('port is running', port);
})
