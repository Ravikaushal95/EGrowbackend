const path = require('path')
const userTbl = require('../models/userModel')
const fs = require('fs');
const userRegisterController = async (req, res) => {
    try {
        const { name, email, mobile, password, address } = req?.body;    
        const img = req?.files?.profile;
        const uploadPath = path.join(__dirname,"..", 'uploads', img?.name)
        await img.mv(uploadPath)
        const user = await userTbl.findOne({ email })
        if(user){
            res.send({
                    sucess: false,
                    code: 400,
                    data: [],
                    message: "Already Registerd",
                    error: true
                })
        }
        if (!user) {
            const data = new userTbl({ name: name, email: email, password: password, mobile: mobile, address: address, profile: img.name })
            const result = await data.save()
            if (result) {
                res.send({
                    sucess: true,
                    code: 201,
                    data: result,
                    message: "User Register SuccessFully",
                    error: false
                })
            }
        }

    } catch (error) {
        res.send(error, "Internal Server Error")
    }

}

const userLoginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const result=await userTbl.findOne({email:email,password:password})
        if(result){
            res.send({
                sucess:true,
                code:200,
                data:result,
                message:"Login Succesful",
                error:false
            })
        }
        else{
           res.send({
                sucess:false,
                code:400,
                data:[],
                message:"Invalid Email or password",
                error:false
            })  
        }
    } catch (error) {
        res.send(error,"Internal Server Error")
    }

}

const getAllUsersController = async (req, res) => {
  try {
    const users = await userTbl.find().sort({ createdAt: -1 }); // Optional: sort by latest
    res.status(200).json({
      success: true,
      code: 200,
      data: users,
      message: "All users fetched successfully",
      error: false
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      code: 500,
      data: [],
      message: "Internal server error while fetching users",
      error: true
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await userTbl.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      code: 200,
      data: users,
      message: "All users fetched successfully",
      error: false
    });
  } catch (error) {
    res.send({ success: false, message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userTbl.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete profile image if it exists
    if (user.profile) {
      const filePath = path.join(__dirname, '..', 'uploads', user.profile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await userTbl.findByIdAndDelete(req.params.id);
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err); // 👈 log actual error
    return res.status(500).json({ message: "Error deleting user" });
  }
};
module.exports = { userRegisterController,userLoginController ,getAllUsersController, getAllUsers, deleteUser }