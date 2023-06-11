const express = require('express');
const router=express.Router()

const {createCollege}=require("../Controllers/collegeController")
const {createInten,GetIntenDetails}=require("../Controllers/internController")

router.post("/functionup/colleges",createCollege)

router.post("/functionup/interns",createInten)

router.get("/functionup/collegeDetails",GetIntenDetails)

module.exports=router;
