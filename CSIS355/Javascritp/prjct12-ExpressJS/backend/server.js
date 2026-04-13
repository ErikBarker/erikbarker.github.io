const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const PORT = dotenv.PORT || 6666;

const {errorHandler} = require('./errorMiddleware/errorMiddleware')

connectDB()

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: false
    }
));
app.use(errorHandler);

//rest of our server logic
app.use('/api/notes' , require('./routes/noteroutes.js'))

//run server
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));