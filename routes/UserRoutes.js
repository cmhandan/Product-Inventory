const express = require('express');
const { register, login, juniorSecret, seniorSecret, teacherSecret } = require('../controller/userController');
const { authJwt } = require('../middelware/authJwt');
const userRouter = new express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/junior-secret', authJwt, juniorSecret);
userRouter.get('/senior-secret', authJwt, seniorSecret);
userRouter.get('/teacher-secret', authJwt,  teacherSecret);


module.exports = {
    userRouter
}