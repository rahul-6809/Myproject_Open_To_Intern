//{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}```}




const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        collegeId: {
            type: ObjectId,
            ref: "college",
            required: true
        },
        emailId: {
            type: String,
            required: true,
            unique: true
        },
        isDeleted:{ 
            type:Boolean,
             default: false
            }
    
    

 }, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema)
