const http = require("http");
const path = require("path");
const fs = require("fs");
const { MongoClient } = require("mongodb");
require('dotenv').config();

// in env file
//  MONGO_URI="mongodb+srv://bibek:upadhayay@cluster0.jazwelx.mongodb.net/?retryWrites=true&w=majority&authMechanism=DEFAULT"

const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Connect once when the server starts, reuse the connection
let booksCollection;

async function connectDB() {
    try {
        await client.connect();
        booksCollection = client.db("bookdb").collection("bookcollection");
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("MongoDB connection failed:", e);
        process.exit(1);
    }
}

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }if (req.url === '/index-temp') {
        fs.readFile(path.join(__dirname, 'public', 'index-temp.html'),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }
    else if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }
    

    else  if (req.url === '/api' && req.method === 'GET') {
            // Your existing fetch-all code
            booksCollection.find({}).toArray()
                .then(results => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(results));
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Failed to fetch books" }));
                });
        }
        else if (req.url === '/api' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                const book = JSON.parse(body);
                booksCollection.insertOne(book)
                    .then(result => {
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Failed to add book" }));
                    });
            });
        }
        else if (req.url.startsWith('/api/') && req.method === 'PUT') {
            const id = Number(req.url.split('/')[2]);//quiz question
            console.log(`updated book ${id}`);//id is not _id
            
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                const updates = JSON.parse(body);
                console.log(updates)
                booksCollection.updateOne(
                    {id:id},
                    {$set:updates}
                ).then(result=>{
                        res.writeHead(200, {'content-type': 'application/json'})
                        res.end(JSON.stringify(result))
                    }
                ).catch(err=>{
                        res.write(500, {'content-type': 'application/json'})
                        res.end("Server Side Error Failed to update book")
                        console.log(err);
                })
            });
        }
        else if (req.url.startsWith('/api/') && req.method === 'DELETE') {
            const id = req.url.split('/')[2];
            console.log(`deleted book ${id}`);
            
        }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>404 nothing is here</h1>");
    }
});

const PORT = process.env.PORT || 5555;

// Connect to DB first, then start the server
connectDB().then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});