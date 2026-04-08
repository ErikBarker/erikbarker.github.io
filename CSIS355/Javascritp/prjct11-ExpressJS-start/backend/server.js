const dotenv = require('dotenv').config();
const PORT = dotenv.PORT || 6666;

const express = require('express');

const app = express();
//rest of our server logic

app.use('/api/notes' , require('./routes/noteroutes.js'))

//run server
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));