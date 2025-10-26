const mongoose = require("mongoose");

const tutorialSchema = mongoose.Schema({
    title:{type:String,requireed:true},
    description:{type:String},
    language:{type:String,required:true},
    VideoUrl:{type:String,required:true}
});

module.exports = mongoose.model("Tutorials",tutorialSchema);