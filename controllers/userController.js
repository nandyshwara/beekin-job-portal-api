const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const _ = require('lodash');

async function signUp(req, res) {
  const { email, password, fullName  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'User already exist with same email',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    delete req.body.role;

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      role : "jobseeker"
    });

    newUser.password = undefined;

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      status: 'success',
      message: 'User created successfully!',
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        wrongField: 'email',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'fail',
        wrongField: 'password',
      });
    }

    user.password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully!',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
      error: err.message,
    });
  }
}

async function getSingleUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: `User not found with ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
}

async function getCurrentUser(req, res) {
  res.send(req.user);
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      message: 'All Users',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  loginUser,
  getCurrentUser,
  getSingleUser,
  getAllUsers,
};
