const mongoose=require('mongoose')
 let adminSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    mobile:{type:String,require:true},
    password:{type:String,require:true},
    location:{type:String,require:true},
    img:{type:String,require:true},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
 })
 const adminTbl=mongoose.model("Admin",adminSchema);
 module.exports={adminTbl}