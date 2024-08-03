const express = require('express');
const ownerRoutes = express.Router();

const ownerController = require('../controllers/ownerController');
const ownerAuthMiddleware = require('../middlewares/ownerAuthMiddleware');
const { signup, signin, getMembers } = ownerController;

ownerRoutes.post('/signup', signup);
ownerRoutes.post('/signin', signin);
ownerRoutes.get('/members', ownerAuthMiddleware, getMembers);

module.exports = ownerRoutes;