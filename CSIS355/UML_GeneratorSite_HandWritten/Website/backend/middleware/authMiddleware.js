const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel')


const protect = asyncHandler(async (req,res,next)=>{

        //this protects routs and request from unautorized users

        let token;

        if(req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            try {
                token = req.headers.authorization.split(' ')[1] //get the token from auth
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) //verify token with secret\

                req.user = await User.findById(decoded.id).select('-password');//finds the user in db w/out pass

                return next() //passes controle to the next function in route
            } catch (error) {
                
                console.log(error)

                res.status(401)

                throw new Error('Not authorized')

            }
        }

        if(!token){
            res.status(401)

            throw new Error('Not authorized, no token');
        }
});

module.exports = {protect}