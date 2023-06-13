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
        if(!validator.isEmail(emailId)) return res.status(400).send({status:false,message:"Invalid email"})
        else{
            const college = await collegeModels.findOne({name:collegeName})
            if(!college) return res.status(404).send({status:false,message:"college not found"})
            else{
                const intern = await internModels.findOne({emailId: emailId})
                if(intern) return res.status(400).send({status:false,message:"Intern already exists"})
                else{
                 const findInternMobile = await internModels.findOne({mobile: mobile})
                 if(findInternMobile) return res.status(400).send({status:false,message:"Intern already exists"})
                 else{

                    
          const newIntern = await internModels.create({name, emailId, mobile, collegeId : college._id}) 

              const sendInter = await internModels.findById(newIntern._id).select({_id:0,__v:0})

            return res.status(201).send({status : true, data : sendInter})
                    
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
