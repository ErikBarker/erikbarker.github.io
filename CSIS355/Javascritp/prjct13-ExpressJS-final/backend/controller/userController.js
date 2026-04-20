//userController.js

const asyncHandler = require('express-async-handler')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const User = require('../model/userModel') // schema-db

// we will have all the function of : registerUser, loginUser, getMe

// here we will connect to our database.

const registerUser = asyncHandler(async (req, res) =>{

    // name, email , password

    const {name, email, password} = req.body 

    

    if(!name || !email || !password){

        throw new Error("Please add all fields")

    }

    //check if the user already exist or not- use email for that

    const userExists = await User.findOne({email})

    if(userExists){

        res.status(400)

        throw new Error(" User already exists")

    }

    // encrypt the password 

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    // we insert userdetails in the db

    const user = await User.create(

        {

            name,

            email,

            password: hashedPassword

        }

    ) 

    // if user is creeated, you will get something from db

    if(user){

        // 201: OKay, something is created

        res.status(201).json(

            {

                _id: user.id,

                name: name,

                email: email,

                token: generateToken(user._id)

            }

        ) 

    }else{

        res.status(400)

        throw new Error("Invalid user data")

    }

    res.status(200).json({message: "register user"})

})

 

const   loginUser = asyncHandler(async (req, res) =>{

    const {email, password} = req.body

   

    const user = await User.findOne({email})

    // user.password (encrypted)

 

    // we need to check the password

    if( user && await(bcrypt.compare(password , user.password))){

        // we are logged in

        res.json({

            _id: user.id,

            name: user.name, 

            email: user.email,

            token: generateToken(user._id)

        })

    }else{

        res.status(400)

        throw new Error("Invalid credentials");

    }

    res.status(200).json({message: "user logged in"})

})

const getMe = asyncHandler(async (req, res) =>{

    //req.user has details from the protect middleware

    const {_id, name, email} = await User.findById(req.user.name);
    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })

    res.status(200).json({message: "user details "})

})

const generateToken= (id)=>{

        return jwt.sign( {id}, process.env.JWT_SECRET_KEY,{

            expiresIn: '30d'

        }  )

}

module.exports={

    registerUser,

    loginUser,

    getMe

}




