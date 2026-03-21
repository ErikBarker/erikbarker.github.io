//Node.js requires
const http = require('http');
const path = require('path');
const fs = require('fs');

//HTTP servers
const server = http.createServer((req, res)=>{
    var public = "public";
    
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
        
    }else if (req.url === '/api') {
        var filePath = path.join(public, "db.json");

        fs.readFile(filePath, 'utf-8', (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {"content-type":"text/json"});
            res.end(content);
        });
        
    }else{
        res.writeHead(404, "content not found");
        res.end();
    }
});

server.listen(5556);