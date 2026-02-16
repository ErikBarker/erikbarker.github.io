//HTTP Server
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer(
    (req, res)=>{

        if (req.url === '/') {

            const htmlpath = path.join(__dirname, "public","index.html");
            fs.readFile(htmlpath, (err,content)=>{
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'content-type':'text/html'})

                res.end(content)
            });
            
        }else

        if (req.url === '/download') {

            const htmlpath = path.join(__dirname, "public","download.html");
            fs.readFile(htmlpath, (err,content)=>{
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'content-type':'text/html'})

                res.end(content)
            });
            
        }else

        if (req.url === '/style.css') {
            const htmlpath = path.join(__dirname, "public","style.css");
            fs.readFile(htmlpath, (err,content)=>{
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'content-type':'text/css'})

                res.end(content)
            });
        }else

        if (req.url === '/umllogo.png') {
            const htmlpath = path.join(__dirname, "public","umllogo.png");
            fs.readFile(htmlpath, (err,content)=>{
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'content-type':'img/png'})

                res.end(content)
            });
        }else

        if (req.url === '/api') {

            const htmlpath = path.join(__dirname, "public","db.json");
            fs.readFile(htmlpath, (err,content)=>{
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'content-type':'application/json'})

                res.end(content)
            });
        } else {
            const htmlpath = path.join(__dirname, "public","404.html");
            fs.readFile(htmlpath, (err,content)=>{
                if (err) {
                    throw err;
                }
                res.writeHead(404, {'content-type':'text/html'})

                res.end(content)
            });
        }
        
        
        
    }
);

server.listen(5959, ()=>console.log("server running"));