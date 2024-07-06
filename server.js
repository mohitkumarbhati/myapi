// console.log("This site page is running.")

// const { json } = require("express")

// function mohit(a,b){
//     return a+b
// }

// var result = mohit(5,20)
// console.log("Output : " + result)

// var add = function( a, b, mohit){
//     var result = a+b;
//     console.log("result : " + result)
//     mohit();
// }

// add(2,4, ()=> {
//     console.log("Mohit Kumar Bhati")
// })

// var fs = require("fs");
// var os = require("os");
 
// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('hithere.txt','Hi'+ user.username+'!\n', ()=> { console.log("This file is successfuly created.")})

// const a = require("./nodes");
// var _ = require('lodash');

// console.log("This is the server js page.")

// var age=a.age;
// console.log(age)

// var data = ['mohit', 'mohit', 1, 2, 1, 2, 'kumar']
// var filter = _.uniq(data)
// console.log(filter)


// --------> Convert String to Object in json <-----------
// const jsonstring = '{ "name" : "Mohit", "age" : "21", "city" : "hanumangarh"}'
// const jsonobject = JSON.parse(jsonstring)
// console.log(jsonobject.name)


// --------> Convert Object into String in json <-------- 
// const objectToConvert = {
//     name: "Mohit",
//     age: 25
// }
// const json = JSON.stringify(objectToConvert)
// console.log(json)

// -------->   API Creation <---------

const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const passport = require('./auth')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000


// Middleware function
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
}

app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/', function (req, res) {
  res.send('Hello....!!! Welcome to my new Website Page where you can check API by typing website url + /person in url like: https://myapi.com/person')
})


// app.get('/mohit', function(req,res) {
//     var biodata = {
//         name : "Mohit",
//         age : 21,
//         college: "IIT Roorkee"
//     }
//     res.send(biodata)
// })

// app.get('/kumar', function(req,res) {
//     res.send("This is mohit kumar api page what can i help you ")
// })

// app.post('/bhati', (req,res)=>{
//     res.send("this is the post method.")
// })

// Import the router files
const personRoutes = require('./Routes/personRoutes')

// Use the Routers
app.use('/person', personRoutes)

app.listen(PORT,()=>{
    console.log('listening on port 3000') }
)

