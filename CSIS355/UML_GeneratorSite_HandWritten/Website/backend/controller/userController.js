const asyncHandler = require('express-async-handler');

const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

const getUserData = asyncHandler(async (req, res) => {
    const {_id, name} = await User.findById(req.user.id);
    res.status(200).json({
        id:_id,
        name:name,
    });
    res.status(200).json({message:"user details"})
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("LOGIN BODY:", req.body);
    const {name, password} = req.body;

    const user = await User.findOne({name});
    console.log("FOUND USER:", user);
    if(user && await(bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid credentials");
    }

    res.status(200).json({message:"user logged in"});

});

const registerUser = asyncHandler(async (req, res) => {
    const {name, password} = req.body;

    if(!name || !password){
        throw new Error("Please add all fields");
    }

    const userExist = await User.findOne({name});

    if(userExist){
        res.status(400)
        throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(
        {
            name, 
            password: hashedPassword
        }
    )

    if(user){
        res.status(201).json(
            {
                _id: user.id,
                token: generateToken(user._id)
            }
        )
    }else{
        res.status(400)
        throw new Error("Invalid user data");
    }

    res.status(200).json({message:"registered user"})
});

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });
}

module.exports = {getUserData, loginUser, registerUser}