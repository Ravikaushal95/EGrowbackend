const userTbl = require('../models/userModel');
const nodemailer = require('nodemailer');
const otpStore = {};
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpMail(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const user = await userTbl.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "User not found",
                error: true,
            });
        }
        const otp = generateOtp();
        const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        otpStore[email] = { otp, expiresAt };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dev.adityakumar92@gmail.com',
                pass: 'hjynbalctydwyinz',
            },
        });
        const mailOptions = {
            from: 'dev.adityakumar92@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp}`,
            html: `<h2>Your OTP code is: <strong>${otp}</strong></h2><p>This code will expire in 5 minutes.</p>`,
        };
        await transporter.sendMail(mailOptions);
        return res.status(201).json({
            success: true,
            code: 201,
            message: 'OTP sent successfully',
            error: false,
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Internal server error',
            error: true,
        });
    }
}
async function verifyOtp(req, res) {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Email, OTP, and new password are required',
        });
    }
    const userData = otpStore[email];
    if (!userData) {
        return res.status(400).json({
            success: false,
            message: 'OTP not found or already verified',
        });
    }
    const currentTime = Date.now();
    if (currentTime > userData.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({
            success: false,
            message: 'OTP has expired',
        });
    }
    if (userData.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: 'Invalid OTP',
        });
    }
    try {
        await userTbl.findOneAndUpdate({ email },{ password: newPassword });
        delete otpStore[email];
        return res.status(200).json({
            success: true,
            message: 'OTP verified and password updated successfully',
        });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update password',
        });
    }
}
module.exports = { sendOtpMail, verifyOtp };
