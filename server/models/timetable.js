const mongoose =require('mongoose');

const timetableSchema = new mongoose.Schema({

    day:{
        type:String,
       //require:true
    },
    firstPeriod:[{
        subject:{
            type:String,
           //required:true
        },
        startingTime:{
            type:String,
           //required:true
        },
        endingTime:{
            type:String,
           //required:true
        },
        tutor:{
            type:String,
           //required:true
        }
    }
    ],
    secondPeriod:[{
        subject:{
            type:String,
           //required:true
        },
        startingTime:{
            type:String,
           //required:true
        },
        endingTime:{
            type:String,
           //required:true
        },
        tutor:{
            type:String,
           //required:true
        }
    }
    ],
    thirdPeriod:[{
        subject:{
            type:String,
           //required:true
        },
        startingTime:{
            type:String,
           //required:true
        },
        endingTime:{
            type:String,
           //required:true
        },
        tutor:{
            type:String,
           //required:true
        }
    }
    ],
    fourthPeriod:[{
        subject:{
            type:String,
           //required:true
        },
        startingTime:{
            type:String,
           //required:true
        },
        endingTime:{
            type:String,
           //required:true
        },
        tutor:{
            type:String,
           //required:true
        }
    }
    ],
    fifthPeriod:[{
        subject:{
            type:String,
           //required:true
        },
        startingTime:{
            type:String,
           //required:true
        },
        endingTime:{
            type:String,
            //required:true
        },
        tutor:{
            type:String,
           //required:true
        }
    }
    ]
})

//const timetableCollection = new mongoose.model("timetableCollection",timetableSchema);
const mcaS1collection = mongoose.model("mcaS1collection", timetableSchema);
const mcaS2collection = mongoose.model("mcaS2collection", timetableSchema);
const mcaS3collection = mongoose.model("mcaS3collection", timetableSchema);
const mcaS4collection = mongoose.model("mcaS4collection", timetableSchema);
const mscS1collection = mongoose.model("mscS1collection", timetableSchema);
const mscS2collection = mongoose.model("mscS2collection", timetableSchema);
const mscS3collection = mongoose.model("mscS3collection", timetableSchema);
const mscS4collection = mongoose.model("mscS4collection", timetableSchema);

module.exports = {
    //timetableCollection,
    mcaS1collection,
    mcaS2collection,
    mcaS3collection,
    mcaS4collection,
    mscS1collection,
    mscS2collection,
    mscS3collection,
    mscS4collection,

};