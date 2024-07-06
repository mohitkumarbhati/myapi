const mongoose = require('mongoose')
require('dotenv').config()

// define the MongoDB connectiono URL
 const mongoURL = process.env.MONGODB_URL_LOCAL;
//const mongoURL = process.env.MONGODB_URL;

// Setup mongoDB Connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintain a default connection object representing the MongoDB Connection
const db = mongoose.connection;

// define eventListner for database connection
db.on('connected', ()=> {
    console.log('Connected to MongoDB server.')
})

db.on('disconnected', ()=> {
    console.log('Disconnected to MongoDB server.')
})

db.on('error', ()=> {
    console.log('error to MongoDB server.')
})

// export the database connection
module.exports = db;
