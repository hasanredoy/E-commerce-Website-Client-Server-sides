const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(  cors({
  origin: [
    "http://localhost:5173",
    //  "*",
    "https://car-doctor-project-d4515.web.app",
    "https://car-doctor-project-d4515.firebaseapp.com",
  ],
  credentials: true,
}))

app.use(cookieParser())


// codes of monogdb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.2xfw1xu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// middle wears 
const verifyUser = (req,res , next)=>{
  const verifyToken = req?.cookies?.token
  console.log( 'token',verifyToken);
  if(!verifyToken){
    return res.status(401).send({message:'unauthorized'})
  }
  jwt.verify(verifyToken , process.env.VERIFICATION_TOKEN,(err,decoded)=>{
    if(err){
      return res.status(401).send({message:'unauthorized'})
    }
    
    req.user = decoded
    next()
  })
  // next()
}

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production" ? true : false,
};



async function run() {
  try {
  

    const gadgetsCollection = client.db('Gadget-ShopDB').collection('gadgets')
    const userCraftCollection = client.db('CraftsDB').collection('crafts')

    // getting all gadgets 
    app.get('/gadgets', async(req,res)=>{
      const gadget=gadgetsCollection.find()
      const result =await gadget.toArray()
      res.send(result)
    })

    // posting user carts 
   app.post('/carts', async(req,res)=>{
    const cartFromBody = req.body 
    console.log(cartFromBody);
    const result = await userCraftCollection.insertOne(cartFromBody)
    res.send(result)
   })

  //  getting users all cart and finding single users carts by email
  app.get('/carts', verifyUser,async(req,res)=>{
    let query = {}
    console.log(req?.query?.email, req?.user?.email );
  if(req?.query?.email !== req?.user?.email ){
    return res.status(403).send({message:'forbidden'})
  }
    if(req.query?.email){
      query={userEmail : req.query.email}
    }

    const userCart = userCraftCollection.find(query)
    const result= await userCart.toArray()
    res.send(result)

  }) 


  // verification related apis 
  app.post('/jwt', async(req, res)=>{
   const user = req.body
   const token = jwt.sign(user , process.env.VERIFICATION_TOKEN , {expiresIn:"1h"})
   console.log('user=', user, 'and token =' , token);
   res.cookie('token' , token , cookieOptions).send({success:'true'})
  })
  // clearing cookie with logout
  app.post('/logout', async(req , res)=>{
    res
    .clearCookie('token',{...cookieOptions , maxAge:0})
    .send({success:true})
  })

  } finally {
   
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
  res.send('gadget Shop is Running')
})

app.listen(port , ()=>{
  console.log('port is running', port);
})
