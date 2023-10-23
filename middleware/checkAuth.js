const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid User Id',
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Authentication Failed! Invalid Token',
    });
  }
};

module.exports = checkAuth;
