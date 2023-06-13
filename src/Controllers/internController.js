const collegeModel = require('../Models/collegeModel')
const internModel = require("../Models/internModel");
const validator = require('validator')



const isValid = function(value){
    if(typeof value === "undefined"|| value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
    return true
  }  
  


const createInten = async (req, res) => {
  try{let { name, email, mobile, collegeName } = req.body;

  if (!isValid(name) ||!isValid(email) ||!isValid(mobile) ||!isValid(collegeName)) {
    return res.status(400).send({ status: false, message: "Invalid input" });
  }

  
  
  if (!validator.isEmail(email)) {
    return res.status(400).send({ status: false, message: "Email should be valid email address" });
  }
 
  const intern = await internModel.findOne({ email });

  if (intern) {
    return res.status(400).send({ status: false, message: "email already exists" });
  }

 
 


  if (!validator.isMobilePhone(mobile)) {
    return res.status(400).send({ status: false, message: "provide correct Mobile number" });
  }

  const internExists = await internModel.findOne({ mobile });

  if (internExists) {
    return res.status(400).send({status: false,message: "Mobile Number already present",
      });
  }
  collegeName = collegeName.trim();
  const college = await collegeModel.findOne({ name: collegeName });

  if (!college) {
 return   res.status(404).send({status: false,message: " college doesn't exists",
      });
  }

    const addIntern = await internModel.create({name, email, mobile, collegeId : college._id}) 

    const resInter = await internModel.findById(addIntern._id).select({_id:0})

   return res.status(201).send({status : true, data : resInter})

}catch(err){ res.status(500).send({status :false , message: err.message})}
}





const GetIntenDetails = async (req,res)=>{
try{
  let college_name = req.query.collegeName
   if(!college_name) return res.status(404).send({status : false, message:"collegeName is required"})

const college = await collegeModel.findOne({name : college_name}).lean()
if(!college)  return res.status(404).send({status:false, message:'college not found'})

const intern = await internModel.find({collegeId:college._id}).select({collegeId:0, isDeleted:0,__v:0})
delete college._id
delete college.isDeleted
delete college.__v
college.interns = intern

res.status(200).send({status:true, data :college})
}catch(err){
  console.log(err) , res.status(500).send({status:false, message:err.message})
}
}


module.exports = {createInten,GetIntenDetails}