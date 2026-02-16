const os = require("os");


console.log("hi");

const prnt = (txt)=>console.log(txt);
prnt(os.platform());
prnt(os.arch());
prnt(os.cpus());
prnt(os.freemem()); //bytes
prnt(os.totalmem()); //bytes

prnt(os.freemem()/os.totalmem()); //free percent

prnt(os.homedir());

prnt(os.uptime());

//CSIS355\Javascritp\prjct6\index.js
//C:\Users\erikb\Documents\GitHub\erikbarker.github.io\CSIS355\Javascritp\prjct6\index.js

const path = require('path');

prnt("filename: " + path.dirname(__filename));
prnt("ext: " + path.extname(__filename));
prnt(path.parse(__filename));

prnt(path.join(__dirname, 'myfolder', 'index.html'))

const fs = require("fs");

//create folder
console.log(path.join(__dirname, "/mynewfolder"))

//fs.mkdir(path_to_a_folder, callback)
// fs.mkdir(path.join(__dirname, "/mynewfolder"), {}, function(err){
//     if(err) throw err;
//     console.log("folder created")
// })

//create file in folder

console.log(path.join(__dirname, "/mynewfolder", "mytxt.txt"));

fs.writeFile(path.join(__dirname, "/mynewfolder", "mytxt.txt"), 
    "created text"
    , function(err){
        if(err) throw err;
     console.log("file created")

     
     fs.appendFile(path.join(__dirname, "/mynewfolder", "mytxt.txt"),
    " new text",
    (err)=>{
        console.log(err)
        console.log("file has been appened")
    })
    })

fs.readFile(path.join(__dirname, "/myfolder", "index.html"), 'utf-8', (err, data)=>{
    if(err) throw err
    prnt("our data: " + data)
})