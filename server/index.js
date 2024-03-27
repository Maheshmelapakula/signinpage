const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');





const {connection} = require("./config/db");
const {Usermodel} = require("./models/User.model")

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/signin", async(req,res)=>{
    const {username , password } = req.body;
    if(!username || !password){
        res.send({msg:"Invalid details"});
    }

    try {

        const user = await Usermodel.find({username});
        if(!user){
            res.send({msg:"Invalid details"});
            return;
        }
        // const isMatch = await bcrypt.compare(password , user.password);
        // if(!isMatch){
        //     res.send({msg:"Invalid details"});
        //     return;
        // }
        res.send({msg:"Login successful"})
        
    } catch (error) {
        console.log(error);
        res.send({msg:"Error in signin"})
    }

  
})




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