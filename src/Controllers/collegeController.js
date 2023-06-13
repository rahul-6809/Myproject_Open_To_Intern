const collegeModels=require('../Models/collegeModel')
const validate=require('validator')

const createCollege= async (req,res) => {
    try{

        const {name,fullName,logoLink} =req.body

        if(!fullName) return res.status(400).send({status:false,message:"Fullname is required"})
        if(!name) return res.status(400).send({status:false,message:"Name is required"})
        if(!logoLink|| logoLink.trim() == '' || !validator.isURL(logoLink)) return res.status(400).send({status:false,message:"Logolink is required"})
        
        else{ 
        const findCollege = await collegeModels.findOne({ name: name });
        if (findCollege) return res.status(400).json({ status: false, message: 'College already exists' });

        const College=await collegeModels.create(req.body)
        const response= {name:College.name, fullName:College.fullName, logoLink:College.logoLink, isDeleted:College.isDeleted}
        req.status(201).send({status:true, data:response})
    }
}
    
    catch(err){ 
    res.status(500).send({message:err.message})
    }
}

module.exports = { createCollege }
