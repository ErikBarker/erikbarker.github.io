const http = require('http');
const path = require('path');
const fs = require('fs');
const {MongoClient, ObjectId} = require('mongodb')
const crypto = require("crypto");
require('dotenv').config();

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function readBody(req) {
    return new Promise((resolve, reject) => {           // Wrap the event-based stream
                                                        // in a Promise for async/await use

        let body = "";                                  // Accumulate incoming data chunks
                                                        // into this string

        req.on("data", (chunk) => (body += chunk));     // Append each chunk as it arrives

        req.on("end", () => resolve(body));             // Resolve with the full body
                                                        // once the stream is finished

        req.on("error", reject);                        // Reject the promise if the
                                                        // stream emits an error
    });
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" }); // Set the status
                                                                        // code and tell
                                                                        // the client to
                                                                        // expect JSON
    res.end(JSON.stringify(data));  // Serialize the data object to a
                                    // JSON string and send it as the body
}

function serveFile(res, filePath) {
    fs.readFile(filePath, (err, content) => {                       // Read the file from
                                                                    // disk asynchronously

        if (err) { res.writeHead(500); res.end("Error"); return; }  // If the file can't be
                                                                    // read, respond with
                                                                    // a 500 error and stop

        res.writeHead(200, { "Content-Type": "text/html" });        // File loaded OK;
                                                                    // set status 200 and
                                                                    // HTML content type

        res.end(content);   // Send the file contents as the response body
    });
}

// ──────────────────────────────────────────────
// In-memory session store
// ──────────────────────────────────────────────

const sessions = {};                            // Plain object used as a key-value
                                                // store mapping session IDs to
                                                // session data; resets on server restart

const SESSION_MAX_AGE = 60 * 60 * 1000;        // Session lifetime in milliseconds;
                                                // 60 min * 60 sec * 1000 ms = 1 hour

function createSession(email) {
    const sessionId = crypto.randomBytes(32).toString("hex");   // Generate a 32-byte
                                                                // random value and encode
                                                                // it as a hex string for
                                                                // use as a session ID
    sessions[sessionId] = { email, createdAt: Date.now() };  // Store the session with
                                                                // the email and the
                                                                // current timestamp

    return sessionId;                                           // Return the new session
                                                                // ID to be sent as a cookie
}

function getSession(sessionId) {
    if (!sessionId) return null;                        // Return null immediately if
                                                        // no session ID was provided

    const session = sessions[sessionId];                // Look up the session in the
                                                        // in-memory store by its ID

    if (!session) return null;                          // Return null if no matching
                                                        // session was found

    if (Date.now() - session.createdAt > SESSION_MAX_AGE) { // Check if the session has
                                                            // been alive longer than
                                                            // the allowed max age

        delete sessions[sessionId];                     // Delete the expired session
                                                        // from the store to free memory

        return null;                                    // Return null to signal the
                                                        // session is no longer valid
    }
    return session;                                     // Return the valid session object
                                                        // if all checks passed
}

function destroySession(sessionId) {
    delete sessions[sessionId];     // Remove the session entry from the
                                    // store, effectively logging the user out
}

// ──────────────────────────────────────────────
// Cookie helpers
// ──────────────────────────────────────────────

function parseCookies(req) {
    const cookies = {};                                 // Start with an empty object
                                                        // to hold parsed cookie pairs

    (req.headers.cookie || "").split(";").forEach((c) => {  // Read the raw Cookie header,
                                                            // fall back to empty string,
                                                            // then split on semicolons
                                                            // to get individual cookies

        const [name, ...rest] = c.trim().split("=");    // Split each cookie on "=" to
                                                        // separate the name from the value

        if (name) cookies[name.trim()] = rest.join("=").trim(); // Re-join the rest in case
                                                                // the value itself contained
                                                                // "=", then store the pair
    });
    return cookies;                                     // Return the completed name-value
                                                        // cookie map
}

function setSessionCookie(res, sessionId) {
    res.setHeader(                                          // Write a Set-Cookie header
                                                            // onto the response
        "Set-Cookie",
        `sid=${sessionId}; HttpOnly; Path=/; Max-Age=${SESSION_MAX_AGE / 1000}`
        // sid       – cookie name holding the session ID
        // HttpOnly  – prevents JavaScript from reading the cookie
        // Path=/    – cookie is sent on every request to this server
        // Max-Age   – tells the browser when to expire it (in seconds)
    );
}

function clearSessionCookie(res) {
    res.setHeader("Set-Cookie", "sid=; HttpOnly; Path=/; Max-Age=0");
    // Overwrite the sid cookie with an empty value and
    // Max-Age=0 so the browser deletes it immediately
}

const PORT = process.env.PORT || 5555;
const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);

let userCollection;
let productCollection;

async function connectDB(){
    try{
        await client.connect();
        userCollection = client.db("UMLGenVertions").collection("users");
        productCollection = client.db("UMLGenVertions").collection("Vertions")
        console.log("Connected to MongoDB");

    }catch(err){
        console.log("Failed to connect to Mongo DB: ",err);
        process.exit(1);
    }
}

const server = http.createServer(async (req, res)=>{

    const cookies = parseCookies(req);          // Parse all cookies from the
                                                // incoming request headers

    const session = getSession(cookies.sid);    // Look up the session using the
                                                // sid cookie value, if present


    if (req.url === "/") {
        res.writeHead(302, { Location: session ? "/dashboard" : "/login" });
        res.end();
    }else if (req.url === "/style.css") {
       fs.readFile(path.join(__dirname, 'public', 'style.css'),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(content);
            }
        );

        return;
    }else if (req.url === "/index.js") {
       fs.readFile(path.join(__dirname, 'public', 'index.js'),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        );

        return;
    } else if (req.url === "/login") {
       if(req.method === 'GET'){
            fs.readFile(path.join(__dirname, 'public', 'login.html'),
                (err, content) => {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            );

            return;
       } else if (req.url === "/login" && req.method === "POST") {   // Handle POST /login
                                                            // (the login form submission)
        let parsed;
        try { parsed = JSON.parse(await readBody(req)); } catch {
            sendJSON(res, 400, { error: "Invalid JSON" }); return;
            // Read the request body and parse it as JSON;
            // respond with 400 if the body is malformed
        }
        const user = userCollection.find((u) => u.email === parsed.email && u.password === parsed.password);
        // Search the USERS array for an entry whose
        // email and password both match the submission

        if (!user) { sendJSON(res, 401, { error: "Invalid email or password" }); return; }
            // If no matching user was found, reject the
            // login attempt with a 401 Unauthorized response

            const sessionId = createSession(user.email); // Create a new session for the
                                                            // authenticated user

            setSessionCookie(res, sessionId);               // Attach the session ID to the
                                                            // response as an HttpOnly cookie

            sendJSON(res, 200, { success: true, email: user.email }); // Confirm success
                                                                            // and return the
                                                                            // email to the
                                                                            // client
            return;
        }

        return;
    } else if (req.url === "/logout") {                   // Handle any method on /logout
        if (cookies.sid) destroySession(cookies.sid);   // If a session cookie exists,
                                                        // delete the session from the store

        clearSessionCookie(res);                    // Overwrite the cookie in the browser
                                                    // so it is immediately invalidated

        res.writeHead(302, { Location: "/login" }); // Redirect the user back to
                                                    // the login page
        res.end();
        return;
    }
    
    if (!session) { res.writeHead(302, { Location: "/login" }); res.end(); return; }
    
    if (req.url === "/dashboard" && req.method === "GET") {    // Handle GET /dashboard;
                                                                // only reachable if the
                                                                // auth wall above passed

        serveFile(res, path.join(__dirname, "public", "dashboard.html")); // Serve the
                                                                          // dashboard HTML
        return;
    }else if (req.url === '/api/products' && req.method === 'GET') {
       productCollection.find({}).toArray()
        .then(results =>{
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }).catch(err=>{
            res.writeHead(500, {'content-type':'application/json'})
            res.end(JSON.stringify({error:"Failed to get products"}))
        })
    } else if(req.url === '/api/products' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk=>{body += chunk;});
        req.on('end',()=>{
            const product = JSON.parse(body);
            productCollection.insertOne(product)
                .then(result => {
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Failed to add product" }));
                    });
        })
    }else if (req.url.startsWith('/api/products/') && req.method === 'PUT') {
            const id = req.url.split('/')[3];
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                const updates = JSON.parse(body);
                // Remove _id and id from updates so they don't get overwritten
                console.log(id)
                delete updates._id;
                delete updates.id;
                productCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updates }
                )
                .then(result => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    console.log(result);
                    res.end(JSON.stringify(result));
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Failed to update product" }));
                });
            });
        }
        else if (req.url.startsWith('/api/products/') && req.method === 'DELETE') {
            const id = req.url.split('/')[3];
            // const { ObjectId } = require('mongodb');
            productCollection.deleteOne({ _id: new ObjectId(id) })
                .then(result => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    console.log(result)
                    res.end(JSON.stringify(result));
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Failed to delete product" }));
                });
        }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>404 nothing is here</h1>");
    }
});

connectDB().then(()=>{
    server.listen(PORT, ()=>{console.log("Server started at port " + PORT)});
});