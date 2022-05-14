import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

var requireAuth = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-x2lg4k5x.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.sneakers',
  issuer: 'https://dev-x2lg4k5x.us.auth0.com/',
  algorithms: ['RS256']
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
    res.send("pong");
  });

/*--------------------------------
          POST REQUESTS
---------------------------------*/

// Creates a new user 
app.post("/users", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const email = req.user["https://api.sneakers/email"];
  const name = req.user["https://api.sneakers/name"];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        auth0Id,
      },
    });

    res.json(newUser);
  }
});

// Creates a new sneaker for current user
app.post("/sneakers", requireAuth, async(req, res) => {
  const {name, brand, type, size, price, quantity, condition, image, location} = req.body;
  try {
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    const userId = req.user.sub;
    const sneaker = await prisma.sneaker.create({
      data:{
        name,
        brand,
        type,
        size,
        price,
        quantity,
        condition,
        image,
        userId,
        location,
      },
    });

    if (sneaker){
      res.status(201).json(sneaker);
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
  }
  catch (e){
    if (e.code == 'P2003') {
      res.status(404).send("Not Found");
    }
  }
});

// Create a new transaction record for user
app.post("/transactions", requireAuth, async(req, res) => {
  const {sneaker, sneakerId, transaction, location} = req.body;
  try {
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    const userId = req.user.sub;
    const trans = await prisma.transaction.create({
      data:{
        userId,
        sneaker,
        sneakerId,
        transaction,
        location,
      },
    });

    if (trans){
      res.status(201).json(trans);
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
  }
  catch (e){
    if (e.code == 'P2003') {
      res.status(404).send("Not Found");
    }
  }
});

// Creates a new message
app.post("/messages", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const {username, message, sneakerId} = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });
    const newMessage = await prisma.message.create({
      data: {
        username,
        message,
        sneakerId,
      },
    });
    res.status(201).json(newMessage);
  }
  catch (e) {
    if (e.code == 'P2003') {
      res.status(404).send("Not Found");
    }
  }
});

// Creates a new review for user
app.post("/reviews", async(req, res) => {
  const {userId, username, rating, comments} = req.body;
  try {
    
    const review = await prisma.review.create({
      data:{
        userId,
        username,
        rating,
        comments,
      },
    });

    if (review){
      res.status(201).json(review);
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
  }
  catch (e){
    if (e.code == 'P2003') {
      res.status(404).send("Not Found");
    }
  }
});

/*--------------------------------
          GET REQUESTS
---------------------------------*/
app.get("/sneakers", async (req, res) => {
  try {
    const sneaker = await prisma.sneaker.findMany();
    if (sneaker){
      res.status(200).json(sneaker);
    }
  }
  catch(e) {
    res.status(404).send("Id Not Found");
  }
});

app.get("/sneakers/:id", async (req, res) => {
  const sneakerId = parseInt(req.params.id)
  try {
    const sneaker = await prisma.sneaker.findUnique({
      where: {
        id: sneakerId,
      },
    });
    if (sneaker){
      res.status(200).json(sneaker);
    }
  }
  catch(e){
    res.status(404).send("Id Not Found");
  }
});

app.get("/users", requireAuth ,async (req, res) => {
  try {
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    if (user){
      res.status(200).json(user);
    }
  }
  catch(e) {
    res.status(404).send("Id Not Found");
  }
});


app.get("/users/sneakers", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });
    
    const sneaker = await prisma.sneaker.findMany({
      where: {
        userId: auth0Id,
      },
    });
    if (sneaker){
      res.status(200).json(sneaker);
    }
  }
  catch(e){
    res.status(404).send("Id Not Found");
  }
});

app.get("/users/:id", requireAuth ,async (req, res) => {
  const userId = req.params.id
  try {
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    const userInfo = await prisma.user.findUnique({
      where: {
        auth0Id: userId,
      },
    });

    if (userInfo){
      res.status(200).json(userInfo);
    }
  }
  catch(e) {
    res.status(404).send("Id Not Found");
  }
});

// Get all transactions for current user
app.get("/transactions", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.user.sub;
    
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    const transaction = await prisma.transaction.findMany({
      where: {
        userId: auth0Id,
      },
    });
    if (transaction){
      res.status(200).json(transaction);
    }
  }
  catch(e) {
    res.status(404).send("Id Not Found");
  }
});

// Get all messages for a sneaker
app.get("/messages/:id", requireAuth ,async (req, res) => {
  const sneakerId = parseInt(req.params.id)
  try {
    const message = await prisma.message.findMany({
      where: {
        sneakerId: sneakerId,
      },
    });
    if (message){
      res.status(200).json(message);
    }
  }
  catch(e){
    res.status(404).send("Id Not Found");
  }
});

// Get all reviews for current user
app.get("/reviews", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });
    
    const review = await prisma.review.findMany({
      where: {
        userId: user.id,
      },
    });
    if (review){
      res.status(200).json(review);
    }
  }
  catch(e) {
    res.status(404).send("Id Not Found");
  }
});

/*--------------------------------
          UPDATE REQUESTS
---------------------------------*/
app.put("/users/:id", requireAuth, async (req, res)=>{
  const userId = parseInt(req.params.id)
  const {name, email, address, username, phone} = req.body
  console.log(phone)
  try{
    const auth0Id = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    const putItem = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          email: email,
          address: address,
          username: username,
          phone: phone,
        },
      });
    res.status(200).json(putItem);
  }
  catch (e){
    if (e.code == 'P2025'){
      res.status(404).send("Id Not Found");
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
  }
});

app.put("/sneakers/:id", async (req, res)=>{
  const sneakerId = parseInt(req.params.id)
  const {name, brand, type, size, price, quantity, condition, image, status} = req.body

  try{
    const putItem = await prisma.sneaker.update({
        where: {
          id: sneakerId,
        },
        data: {
          name: name,
          brand: brand,
          type: type,
          size: size,
          price: price,
          quantity: quantity,
          condition: condition,
          image: image,
          status: status,
        },
      });
    res.status(200).json(putItem);
  }
  catch (e){
    if (e.code == 'P2025'){
      res.status(404).send("Id Not Found");
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
  }
});

app.put("/reviews/:id", async (req, res)=>{
  const reviewId = parseInt(req.params.id)
  const {username, rating, comments} = req.body

  try{
    const putItem = await prisma.review.update({
        where: {
          id: reviewId,
        },
        data: {
          username: username,
          rating: rating,
          comments: comments,
        },
      });
    res.status(200).json(putItem);
  }
  catch (e){
    if (e.code == 'P2025'){
      res.status(404).send("Id Not Found");
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
  }
});
/*--------------------------------
          DELETE REQUESTS
---------------------------------*/
app.delete("/users/:id", async(req, res)=>{
  const userId = parseInt(req.params.id)

  try{
    const deleteItem = await prisma.user.delete({
      where: {
        id: userId,
      },
    })
    
    res.status(200).json(deleteItem);
  }
  catch (e){
    if (e.code == 'P2025') {
      res.status(404).send("Id Not Found");
    }
  }
});

app.delete("/sneakers/:id", async(req, res)=>{
  const sneakerId = parseInt(req.params.id)

  try{
    const deleteItem = await prisma.sneaker.delete({
      where: {
        id: sneakerId,
      },
    })
    
    res.status(200).json(deleteItem);
  }
  catch (e){
    if (e.code == 'P2025') {
      res.status(404).send("Id Not Found");
    }
  }
});

app.delete("/reviews/:id", async(req, res)=>{
  const reviewId = parseInt(req.params.id)

  try{
    const deleteItem = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    })
    
    res.status(200).json(deleteItem);
  }
  catch (e){
    if (e.code == 'P2025') {
      res.status(404).send("Id Not Found");
    }
  }
});

app.delete("/transactions/:id", async(req, res)=>{
  const transactionId = parseInt(req.params.id)

  try{
    const deleteItem = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    })
    
    res.status(200).json(deleteItem);
  }
  catch (e){
    if (e.code == 'P2025') {
      res.status(404).send("Id Not Found");
    }
  }
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
 });