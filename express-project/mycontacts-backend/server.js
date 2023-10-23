const express = require('express');
const errorHandler = require('./middelware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDb();  
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); 
app.use('/api' , require('./routes/contactRoutes'));
app.use(errorHandler);

app.listen(port,() => {
    console.log(`listening on port ${port}`);  
});