//flow
//user visit site
//check sestion cookie
//[not logedin] -> loginpage
//[logedin] -> dashboard
//login success -> create cookie -> set cookie
//access protected route
//logout -> destroy sestion -> clear cookie

const http = require('http');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto') //use to gen secure random sestion id

//get username and password from database
//database logic (fake db rn)
//db.collection.find({})

const USERS = [
    {
        "username":"admin",
        "password":"password"
    },{
        "username":"othersuser",
        "password":"password2"
    }
]

//in memory store ses.
//we store this in our server

const sessions = {};

//session experiation time
const SESSION_MAX_AGE = 60*60*1000 // 1 hour in ms

//function for new ses for user
function createSession(username){
    //gen ses id
    const sessionID = crypto.randomBytes(32).toString("hex");

    sessions[sessionID] = {
        username,
        createAt:Date.now()
    }
}

//retrieave amd validate session

function getSesstion(sessionID){
    if(!sessionID) return null;

    const session = sessions[sessionID];

    if(!session) return null;

    //check weather it has been 1 hour

    if(Date.now() - session.createAt> SESSION_MAX_AGE){
        delete sessions[sessionID];
        return null;
    }

    return session;
}

function destroySesstion(sessionID){
    delete sessions[sessionID];
}