const express=require('express')
const userRoute=express.Router()
const {sendOtpMail,verifyOtp}=require('../controllers/otpController')
const {userRegisterController,userLoginController}=require('../controllers/userController')
userRoute.post('/user-register',userRegisterController)
userRoute.post('/user-login',userLoginController)
userRoute.post('/send-otp',sendOtpMail)
userRoute.post('/verify-otp',verifyOtp)
module.exports=userRoute;