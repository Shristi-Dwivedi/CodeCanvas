const mongoose = require("mongoose");

const testHistorySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    testName:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    attemptedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("TestHistory", testHistorySchema);