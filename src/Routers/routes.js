const express = require('express');
const router=express.Router()

const {createCollege,GetCollegeDetails}=require("../Controllers/collegeController")
const {createInten}=require("../Controllers/internController")

router.post("/functionup/colleges",createCollege)

router.post("/functionup/interns",createInten)

router.get("/functionup/collegeDetails",GetCollegeDetails)

module.exports=router;
