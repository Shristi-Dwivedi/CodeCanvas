const express = require('express');
// import TestHistory from "../models/TestHistory";
const TestHistory = require("../models/TestHistory");

const router = express.Router();

router.post("/",async(req,res)=>{
    try{
        const {userId,testName,score,totalMarks,grade} = req.body;
        const history = new TestHistory({userId,testName,score,totalMarks,grade});
        await history.save();
        res.status(201).json({message:"Test saved success",history});
    }catch(err){
        console.error("Error saving",err);
        res.status(500).json({error:"Server errror"});
    }
})

router.get('/:userId',async(req,res)=>{
    try{
        const {userId} = req.params;
        const histories = await TestHistory.find({userId}).sort({attemptedAt:-1});
        res.json(histories);
    }catch(err){
        console.error("Error while fetching",err);
        res.status(500).json({error:"Server Error"});
    }
})

module.exports = router;