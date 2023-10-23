const express = require('express');
const router = express.Router();
const {
  signUp,
  loginUser,
  getSingleUser,
  getAllUsers,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/signup', signUp);
router.post('/login', loginUser);
router.get('/:id', getSingleUser);

module.exports = router;
