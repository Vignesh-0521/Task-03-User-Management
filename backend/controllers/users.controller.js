const { v4: uuidv4 } = require('uuid');   //used to generate random id
const users = require('../data/users');   //imports users from users.js in data

//get all users
const getUsers = async(req, res) => {
    await res.json(users);
};

//get individual user
const getUser = async (req, res, next) => {
    const user = await users.find(u => u.id === req.params.id);
    if (!user) return next({ status: 404, message: 'User not found' });
    res.json(user);
  }

//create a new user
const createUser = async(req, res) => {
    const { name, email } = await req.body;
    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
}

//update user
const updateUser = async (req, res, next) => {
    const userIndex = await users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) return next({ status: 404, message: 'User not found' });

    users[userIndex] = { id: req.params.id, ...req.body };
    res.json(users[userIndex]);
  }

//delete user
const deleteUser = async(req, res, next) => {
    const index = await users.findIndex(u => u.id === req.params.id);
    if (index === -1) return next({ status: 404, message: 'User not found' });

    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  }

module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}