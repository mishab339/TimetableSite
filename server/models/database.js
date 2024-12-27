const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/miniprojectdatabase")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})
//models

require('./studentUser');
require('./facultyUser');