const express=require('express');
const morgan= require('morgan');
const colors=require('colors');
const cors=require('cors');
const dotenv=require('dotenv');
const path=require('path')
const connectDB = require('./config/connectDB');
const app=express();
dotenv.config();

// calls database
connectDB();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// routes
app.use('/api/v1/users',require('./routes/userRoutes'));

// transection
app.use('/api/v1/transections',require('./routes/transectionRoutes'));

app.use(express.static(path.join(__dirname,"./client/build")))

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

// port and listen
const PORT=8080 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is listen on ${PORT}`);
})