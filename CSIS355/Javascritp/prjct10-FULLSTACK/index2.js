const http = require('http');
const os = require('os');
const fs = require('fs');
const path = require('path');
const {MongoClient} = require("mongodb");

//get uri
require("dotenv").config();
const URI = process.env.MONGO_URI;

//mongodb client

const client = new MongoClient(URI);
let bookCollection;
async function connectDB () {
   try {
     await client.connect();
     bookCollection = client.db("bookdb").collection("bookcollection");
     
   } catch (error) {
    console.error(
        "mongodb connection failed",error
    )

    //exit program
    process.exit(1);
   }
}



const server = http.createServer((req,res)=>{
    const public = path.join(__dirname, "public");

    if (req.url === '/') {
        console.log("index.html");
        const redpath = path.join(public, "index.html");
        fs.readFile(redpath,(err,content)=>{
            if(err){
                throw err
            }

            res.writeHead(200, {'content-type':'text/html'});
            res.end(content);
        })

    } else if(req.url === '/donwload.html'){
        console.log("download");
        const redpath = path.join(public, "donwload.html");
        fs.readFile(redpath,(err,content)=>{
            if(err){
                throw err
            }

            res.writeHead(200, {'content-type':'text/html'});
            res.end(content);
        })

    } else if(req.url === '/style.css'){
        console.log("style");
        const redpath = path.join(public, "style.css");
        fs.readFile(redpath,(err,content)=>{
            if(err){
                throw err
            }

            res.writeHead(200, {'content-type':'text/css'});
            res.end(content);
        })

    }else if(req.url === '/umllogo.png'){
        console.log("umllogo");
        const redpath = path.join(public, "umllogo.png");
        fs.readFile(redpath,(err,content)=>{
            if(err){
                throw err
            }

            res.writeHead(200, {'content-type':'image/png'});
            res.end(content);
        })

    } else if (req.url === '/api') {
        console.log("api");
        if (req.method === 'GET') {
            //get books
            bookCollection.find({}).toArray().then(
                results =>{
                    res.writeHead(200, {'content-type':'application/json'});
                    res.end(JSON.stringify(results));
                }
            ).catch((err)=>{
                res.writeHead(500, {'content-type':'application/json'});
                res.end(JSON.stringify({error: "failed to fetch books"}));
            });
        } else if(req.method === 'POST'){

        }else if(req.method === 'PUT'){
            
        }else if(req.method === 'DELETE'){
            
        } else {
            res.writeHead(404, {'content-type':'text/html'});
            res.end("<h1> 404 nothing here <h1>")
        }
    } else {
        console.log("404")
        const redpath = path.join(public, "404.html");
        fs.readFile(redpath,(err,content)=>{
            if(err){
                throw err
            }

            res.writeHead(404, {'content-type':'text/html'});
            res.end(content);
        })

    }
});

const PORTNUMBER = 5555;

//wait for connection
connectDB().then(
    ()=>{
        //start server
        server.listen(PORTNUMBER, ()=>console.log("server running"))
    }
)


