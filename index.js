var express = require("express");
var app = express();
const PORT = 3000;

app.use(express.json()); 
const users = [];  

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));

app.get("/home",(req,res)=>{
    res.sendFile("index.html",{root: __dirname});
});

app.post("/data",(req,res)=>{
    const userData=req.body;
    console.log("Received user data:",userData);
    if (userData.username&&userData.password) {
        users.push(userData); 
        res.json({
            message:"User data received successfully",
            data:users
        });
    } else{
        res.status(400).json({
            message:"Invalid user data"
        });
    }
});

app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>u.username===username&&u.password===password);
    if (user){
        res.json({
            message:"Login successful",
            user:user
        });
    } else{
        res.status(401).json({
            message:"Invalid username or password"
        });
    }
});
