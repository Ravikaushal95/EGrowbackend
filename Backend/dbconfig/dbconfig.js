const mongoose=require('mongoose')
const DataBase=async()=>{
    const isConnect=await mongoose.connect(process.env.MONGODB_URI)
    if(isConnect){
        console.log("DataBase Connected Successfully!")
    }
    else{
        console.log("DataBase Connectivity Error")
    }
}
module.exports=DataBase;  