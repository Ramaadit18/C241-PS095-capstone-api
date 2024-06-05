const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const {
  createUser,
  getUsers,
  getUserById,
  updateUsername,
  updateUserEmail,
  updateUserPassword,
  deleteUser
} = require('./handler');
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', verifyToken, getUserById);
router.patch('/username/:id', verifyToken, updateUsername);
router.patch('/email/:id', verifyToken, updateUserEmail);
router.patch('/password/:id', verifyToken, updateUserPassword);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
