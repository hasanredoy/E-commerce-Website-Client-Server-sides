const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express()

app.use(express.json())
app.use(cors())
