const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // use .env in real apps
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(403).json({ message: 'Not authorized as admin' });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
