const mongoose = require('mongoose')

// Define Person Schema
const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },

    age: {
        type : Number
    },

    email: {
        type : String,
        required : true
    }
})

// Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;