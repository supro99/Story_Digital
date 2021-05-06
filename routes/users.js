const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');
const verifyToken = require('../auth/verifyToken');


/* GET users listing. */
// Create user.
router.post('/signup', userServices.userSignup);

//User Login API
router.post('/login', userServices.userLogin);

//Create post
router.post('/', verifyToken, userServices.createPost);

//View all post
router.get('/', verifyToken, userServices.getAllPost);

//Delete all post
router.delete('/', verifyToken, userServices.deletePost);

module.exports = router;
