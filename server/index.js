const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')





const {connection} = require("./config/db");
const {Usermodel} = require("./models/User.model");

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello")
})



app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
  
      // Check if the user already exists
      const existingUser = await Usermodel.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
  
      // Create a new user
      const user = new Usermodel({ username, password });
      const savedUser = await user.save();
  
      res.json(savedUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




const PORT = process.env.PORT || 8090;


app.listen(PORT, async()=>{
    try {

        await connection;
        console.log("Connected to database successfully");
        
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to database");
        
    }
    console.log(`Server is running on http://localhost:${PORT}`);
})