const collegeModels= require('../Models/collegeModel')
const internModels=require('../Models/internModel')
const validate = require('validator');

const createInten= async (req,res) =>{
    try{
        const {name,mobile,collegeName,emailId}=req.body
        if(!name) return res.status(400).send({status:false,message:"Name is required"})    
        if(!mobile) return res.status(400).send({status:false,message:"Mobile is required"})    
        if(!collegeName) return res.status(400).send({status:false,message:"collegeName is required"})    
        if(!emailId) return res.status(400).send({status:false,message:"EmailId is required"})    
        if(!validate.isMobilePhone(mobile)) return res.status(400).send({status:false,message:"Invalid Mobile Number"})
        if(!validate.isemail(emailId)) return res.status(400).send({status:false,message:"Invalid email"})
        else{
            const findCollegeName = await collegeModels.findOne({name:collegeName})
            if(!findCollegeName) return res.status(400).send({status:false,message:"college not found"})
            else{
                const findInternEmail = await internModels.findOne({emailId: emailId})
                if(findInternEmail) return res.status(400).send({status:false,message:"Intern already exists"})
                else{
                 const findInternMobile = await internModels.findOne({mobile: mobile})
                 if(findInternMobile) return res.status(400).send({status:false,message:"Intern already exists"})
                 else{
                    const intern= await internModels.create(req.body)
                    const InternResponse = {name: intern.name,   mobile: intern.mobile,    collegeid: intern.collegeId,emailId: intern.emailId,  isDelete: intern.isDelete}
                    res.status(201).send({status:true,data:InternResponse})
                 }
                }
            }
        }

    }catch(err){
        res.status(500).send({status:false, message:err.message});
    }
}




const GetIntenDetails= async (req, res) =>{
    try{
        const college_Name = req.params.collegeName

        if(!college_Name) return res.status(404).send({status:false, message:"collegeName is required"})
        else{
            const College= await collegeModels.findOne({name:college_Name})
            if(! College) return res.status(404).send({status:false, message:" College is not found"})
            else{
                const intern=await internModels.find({collegeId: College._id}.select({name:1,emailId:1,mobile:1}))
                const collegeDetails = {name:College.name,fullName:College.fullName,logolink: College.logolink,Interns:intern}
                res.status(200).send({status:true,data:collegeDetails})
            }
        }

    }catch(err){ res.status(500).send({status:false, message:err.message}); }
}


module.exports = { createInten, GetIntenDetails }    