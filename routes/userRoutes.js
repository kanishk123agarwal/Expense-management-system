const express=require('express');
const { registerController, loginController } = require('../controllers/userController');

const router=express.Router();

// login
router.post('/login',loginController);

// register
router.post('/register',registerController)


// exports
module.exports=router
