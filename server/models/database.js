require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
 const mongoose=require('mongoose')
mongoose.connect(mongoURI)
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log(err)
    console.log("failed to connect");
})
//models

require('./studentUser');
require('./facultyUser');
require("./timetable");