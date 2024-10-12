
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/UserRouter.js')
const port = 3000;
const MONGO_Url = process.env.MONGO_Url;

app.use(express.json());
// Allow requests from Netlify domain
// app.use(cors({ origin: 'https://voluble-dasik-dd017e.netlify.app/' }));

app.use(cors()); // Allow all origins
app.use('/api/users', userRoutes);
mongoose.connect(MONGO_Url).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

app.get('/' , (req,res)=>{
  res.send("hey world")
})

aap.get('/test' , (req,res)=>{
  res.send("hey it me ")
})



app.listen(port , (Error)=>{
  console.log(`server  is running at port : ${port}`);

})