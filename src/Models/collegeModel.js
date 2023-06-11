//{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const mongoose =require('mongoose')

const collegeSchema=new mongoose.SchemaType({

    
    name: {
        type: String,
        required: true,
        unique:true
    }, 
    fullName: {
        type: String,
        required: true,
    }, 
    logoLink: {
        type: String,
        required: true
      
        }, 
    isDeleted: {
        default:false,
        type:Boolean,
    }

} ,{timestamps:true})


module.exports = mongoose.model("college", collegeSchema)