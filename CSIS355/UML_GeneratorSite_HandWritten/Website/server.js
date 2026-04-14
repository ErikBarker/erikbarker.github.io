//server URL https://erikbarker-github-io.onrender.com
//api URL https://erikbarker-github-io.onrender.com/api
const http = require('http');
const path = require('path');
const fs = require('fs');
const {MongoClient} = require('mongodb')

let UMLGenVertions;
const URI = 'mongodb://NoteAppUser:notePass@ac-mbz5f01-shard-00-00.hgjj1vy.mongodb.net:27017,ac-mbz5f01-shard-00-01.hgjj1vy.mongodb.net:27017,ac-mbz5f01-shard-00-02.hgjj1vy.mongodb.net:27017/?ssl=true&replicaSet=atlas-6o79sr-shard-0&authSource=admin&appName=ebrker355';
const client = new MongoClient(URI);

const connectDB = async ()=>{
    try {
        await client.connect();
        UMLGenVertions = client.db("UMLGenVertions").collection("Vertions");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

//HTTP servers
const server = http.createServer((req, res)=>{
    var public = path.join(__dirname,"Public");
    
    if (req.url === '/') {
        var filePath = path.join(public, "index.html");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"text/html"});
            res.end(content);
        });
        
    }else if (req.url === '/umllogo.png') {
        var filePath = path.join(public, "umllogo.png");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"image/png"});
            res.end(content);
        });
        
    }else if (req.url === '/style.css') {
        var filePath = path.join(public, "style.css");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"text/css"});
            res.end(content);
        });
        
    }else if (req.url === '/hamberg.js') {
        var filePath = path.join(public, "hamberg.js");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"text/js"});
            res.end(content);
        });
        
    }else if (req.url === '/downloadMenu.js') {
        var filePath = path.join(public, "downloadMenu.js");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"text/js"});
            res.end(content);
        });
        
    }else if (req.url === '/bugform.js') {
        var filePath = path.join(public, "bugform.js");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"text/js"});
            res.end(content);
        });
        
    }else if (req.url === '/api' && req.method === 'GET') {//TODO finish updating to work with mongo db (maybe update frontend to use selection req instead of retreaving all data every time and filtering)
        var filePath = path.join(public, "db.json");

        UMLGenVertions.find({}).toArray().then((results)=>{
            res.writeHead(200, {'content-type' : 'application/json'});
            res.end(JSON.stringify(results));
        }).catch(err => {
            res.writeHead(500, {'content-type' : 'application/json'})
            res.end(JSON.stringify({ error: "Failed to fetch UML Vertions" }));
        });
        
    }else{
        res.writeHead(404, "content not found");
        res.end();
    }
});

connectDB().then(()=>{
    server.listen(5556, ()=>{console.log("Server Started")});
})