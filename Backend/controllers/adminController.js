const { adminTbl } = require('../models/adminModel')
const jwt = require('jsonwebtoken');
const adminController = async (req, res) => {
    const { name, email, mobile, password, location } = req?.body;
    const img = req.files.img;
    img.mv('uploads/' + img.name, (err) => {
        if (err) {
            res.send(err)
        }
    })
    const isUser = await adminTbl.findOne({ email: email }) 
    if (!isUser) {
        const data = new adminTbl({ name: name, email: email, mobile: mobile, password: password, location: location, img: img.name })
        const result = await data.save();
        res.json({
            code: 200,
            data: result,
            message: "Admin Register Successfully"
        })
    }
    else {
        res.json({
            code: 400,
            data: [],
            message: "Already Registerd"
        })
    }
}
const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminTbl.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        code: 401,
        data: [],
        message: 'Invalid email or password',
        error: true
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      code: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
      message: 'Admin login successful',
      error: false
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Something went wrong',
      error: true,
      details: error.message
    });
  }
};

module.exports = { adminController ,adminLoginController}