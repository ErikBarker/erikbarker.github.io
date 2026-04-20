const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const PORT = dotenv.PORT || 5555;

const {errorHandler} = require('./Middleware/errorMiddleware.js')

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
app.use('/api/users' , require('./routes/userRoutes.js'))

//run server
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));