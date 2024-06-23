const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.SK_Payment);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());

// codes of monogdb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.2xfw1xu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// middle wears
const verifyUser = (req, res, next) => {
  const verifyToken = req?.cookies?.token;
  // console.log( 'token',verifyToken);
  if (!verifyToken) {
    return res.status(401).send({ message: "unauthorized" });
  }
  jwt.verify(verifyToken, process.env.VERIFICATION_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized" });
    }

    req.user = decoded;
    next();
  });
  // next()
};



const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production" ? true : false,
};

async function run() {
  try {
    const gadgetsCollection = client.db("Gadget-ShopDB").collection("gadgets");
    const userCraftCollection = client.db("Gadget-ShopDB").collection("carts");
    const userReviewCollection = client.db("Gadget-ShopDB").collection("reviews");
    const usersCollection = client.db("Gadget-ShopDB").collection("users");
    const paymentsCollection = client.db("Gadget-ShopDB").collection("payments");
    // verify admin 
const verifyAdmin =async (req,res,next)=>{
  const query = {role : 'admin'}
  const checkAdmin = usersCollection.find(query)
  if(!checkAdmin){
    res.status(403).send({message:'unauthorized'})
  }
  next()
}

    // getting all gadgets
    app.get("/gadgets", async (req, res) => {
      let filter = {};
      const { search } = req?.query;

      if (req.query?.search) {
        filter = {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { product_name: { $regex: search, $options: "i" } },
          ],
        };
      }
      //  console.log(filter);
      const size = parseInt(req?.query?.size);
      const page = parseInt(req?.query?.page);
      const result = await gadgetsCollection
        .find(filter)
        .limit(size)
        .skip(page * size)
        .toArray();
      res.send(result);
    });

    //  get all gadgets length
    app.get("/gadgets/count", async (req, res) => {
      const gadget = await gadgetsCollection.estimatedDocumentCount();
      res.send({ count: gadget });
    });
    //  get all gadgets for specific user 
    app.get("/my-gadgets", async (req, res) => {
      const email = req.query?.email
      const query = {seller_email:email}
      console.log('specific user email',query);
      
      const resul = await gadgetsCollection.find(query).toArray();
      console.log('specific user result',resul);

      res.send(resul);
    });

    // getting single gadgets
    app.get("/gadgets/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await gadgetsCollection.findOne(query);
      res.send(result);
    });
    //updating single gadgets
    app.put("/gadgets/:id", async (req, res) => {
      const id = req.params.id;

      const data = req.body;

      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateData = {
        $set: {
          category: data.category,
          company: data.company,
          description: data.description,
          image: data.image,
          price: data.price,
          product_name: data.product_name,
          rating: data.rating,
          title: data.title,
        },
      };
      const result = await gadgetsCollection.updateOne(query,updateData,options);
      res.send(result);
    });
    //deleting single gadgets
    app.delete("/gadgets/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await gadgetsCollection.deleteOne(query);
      res.send(result);
    });
   
    // post gadget
    app.post('/add-gadgets', async(req,res)=>{
      const data = req.body;
      const result = await gadgetsCollection.insertOne(data)
      res.send(result)
    }) 




    // posting user carts
    app.post("/carts", async (req, res) => {
      const cartFromBody = req.body;
      // console.log(cartFromBody);
      const result = await userCraftCollection.insertOne(cartFromBody);
      res.send(result);
    });

    //  getting users all cart and finding single users carts by email
    app.get("/carts", verifyUser, async (req, res) => {
      let query = {};
      // console.log(req?.query?.email, req?.user?.email );
      if (req?.query?.email !== req?.user?.email) {
        return res.status(403).send({ message: "forbidden" });
      }
      if (req.query?.email) {
        query = { userEmail: req.query.email };
      }

      const userCart = userCraftCollection.find(query);
      const result = await userCart.toArray();
      res.send(result);
    });
    //  deleting user cart
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await userCraftCollection.deleteOne(filter);
      res.send(result);
    });

    // user review apis
    app.get("/reviews", async (req, res) => {
      let query = {};
      // console.log("review",req?.query?.email);

      if (req.query?.email) {
        query = { email: req?.query?.email };
      }
      const result = await userReviewCollection.find(query).sort({
        posting_time:-1}).toArray();
      res.send(result);
    });

    app.post("/reviews", async (req, res) => {
      const reviewData = req.body;
      const result = await userReviewCollection.insertOne(reviewData);
      res.send(result);
    });

    // users apis
    app.get("/userss", verifyUser, verifyAdmin,async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    app.get("/users/admin/:email", verifyUser, async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const filter = { email: email };
      const findAdmin = await usersCollection.findOne(filter);

      let admin = false;
      if (findAdmin) {
        admin = findAdmin?.role === "admin";
      }

      res.send({ admin });
    });
    app.post("/users", async (req, res) => {
      const userData = req.body;

      const filter = { email: userData.email };
      const findUser = await usersCollection.findOne(filter);
      if (findUser) {
        return res.send({ message: "user Already Exist", insertedId: null });
      }

      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });
    

    //update user to admin
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          role: "admin",
        },
      };

      const result = await usersCollection.updateOne(filter, update);
      res.send(result);
    });
    //update user profile
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const data = req.body
      const filter = {email : email };
      const update = {
        $set: {
          name:data.name,
          photo:data.photo,
          
        },
      };

      const result = await usersCollection.updateOne(filter, update);
      res.send(result);
    });

    //delete user 
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(filter);
      res.send(result);
    });

    // verification related apis
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.VERIFICATION_TOKEN, {
        expiresIn: "1h",
      });
      //  console.log('user=', user, 'and token =' , token);
      res.cookie("token", token, cookieOptions).send({ success: "true" });
    });
    // clearing cookie with logout
    app.post("/logout", async (req, res) => {
      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });


    // create payment intent  
    app.post('/payment-intent',async(req,res)=>{
      const {price} = req.body
      // create payment intent 
      const paymentIntent=await stripe.paymentIntents.create({
        amount: parseFloat(price * 100),
        currency:"usd",
        payment_method_types:['card']
      })
      res.send({
        clientSecret:paymentIntent.client_secret
      })
    })

    // get payments 
    app.get("/payments",async(req,res)=>{
      const email= req.query?.email
      const query = {email :email}
      const result = await paymentsCollection.find(query).toArray()
      res.send(result)
    })

    // post payments 
    app.post("/payments",async(req,res)=>{
      const data = req.body
      const email= req.query?.email
      const result = await paymentsCollection.insertOne(data)
      console.log(result);
      if(result?.insertedId){
        const deleteRes = await userCraftCollection.deleteMany({userEmail:email})
        res.send({result,deleteRes})
      }
    })

    // get admin stats 
    app.get("/admin-stats", async(req,res)=>{
      // get all payments 
      const payments = await paymentsCollection.estimatedDocumentCount()

      // get total paid amount 
      const paidAmount = await paymentsCollection.aggregate([{
        $group:{
           _id:null,
           totalAmount:{$sum: "$totalPrice"}
        }
      }]).toArray()
      const totalPaidAmount= paidAmount[0].totalAmount
      // console.log(totalPaidAmount);

      //  get all customer
      const customer = await usersCollection.estimatedDocumentCount()
      
      //  get all gadgets
      const gadgets = await gadgetsCollection.estimatedDocumentCount()
      
      res.send({payments,totalPaidAmount,customer,gadgets})
    })

    app.get('/order-stats',async(req,res)=>{
      const result = await paymentsCollection.aggregate([
        {
          $unwind:"$cart"
        },
        {
          $group:{
            _id:"$cart.category",
            quantity:{
              $sum:1
            },
            revenue:{
              $sum:{
                $toDouble: "$cart.price"
                }
            },
            
          }
        },
        {
          $project:{
            _id:0,
            category:"$_id",
            quantity:"$quantity",
            revenue:"$revenue",
          }
        }
      ]).toArray()
      res.send(result)
    })

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("gadget Shop is Running");
});

app.listen(port, () => {
  console.log("port is running", port);
});
