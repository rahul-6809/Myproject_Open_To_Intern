const collegeModels= require('../Models/collegeModel')
const internModels=require('../Models/internModel')
const validator = require('validator');

const createInten= async (req,res) =>{
    try{
        const {name,mobile,collegeName,emailId}=req.body
        if(!name) return res.status(400).send({status:false,message:"Name is required"})    
        if(!mobile) return res.status(400).send({status:false,message:"Mobile is required"})    
        if(!collegeName) return res.status(400).send({status:false,message:"collegeName is required"})    
        if(!emailId) return res.status(400).send({status:false,message:"EmailId is required"})    
        if(!validator.isMobilePhone(mobile)) return res.status(400).send({status:false,message:"Invalid Mobile Number"})
        if(!validator.isemail(emailId)) return res.status(400).send({status:false,message:"Invalid email"})
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

                    const internData = {name: name, emailId: emailId, mobile: mobile, collegeId: findCollege._id}
                   const intern= await internModels.create(internData)
                    const InternResponse = {name: intern.name,   mobile: intern.mobile,    collegeid: intern.collegeId, emailId: intern.emailId,  isDeleted: intern.isDeleted}
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

        if(!college_Name) return res.status(400).send({status:false, message:"collegeName is required"})
        else{
            const College= await collegeModels.findOne({name:college_Name})
            if(! College) return res.status(400).send({status:false, message:" College is not found"})
            else{
                const intern=await internModels.find({collegeId: College._id}.select({name:1,emailId:1,mobile:1}))
                const collegeDetails = {name:College.name, fullName:College.fullName, logoLink: College.logoLink, Interns:intern}
                res.status(200).send({status:true,data:collegeDetails})
            }
        }

    }catch(err){ res.status(500).send({status:false, message:err.message}); }
}


module.exports = { createInten, GetIntenDetails }    
