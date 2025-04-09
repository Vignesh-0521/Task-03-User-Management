const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users.controller');

// helper function for validation error check
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array() });
  }
  next();
};

// POST /api/users
router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ], validate,
  createUser);

// GET /api/users
router.get('/', getUsers);

// GET /api/users/:id
router.get('/:id',
  [param('id').notEmpty().withMessage('User ID is required')], validate,
  getUser);

// PUT /api/users/:id
router.put('/:id',
  [
    param('id').notEmpty().withMessage('User ID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],validate,
  updateUser);

// DELETE /api/users/:id
router.delete('/:id',
  [param('id').notEmpty().withMessage('User ID is required')],validate,
  deleteUser);

module.exports = router;
