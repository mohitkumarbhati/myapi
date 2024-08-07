const express = require('express')
const router = express.Router()

const Person = require('./../models/person')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

// POST route to add a Person
router.post('/signup', async(req,res)=> {
    try{
      const data = req.body // Assuming the request body contains the person data
  
    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data)
  
    // Save the new Person to the database
    const response = await newPerson.save()
    console.log('data saved.')

    const payload = {
      id: response.id,
      username: response.username
    }

    const token = generateToken(payload)
    console.log("Token is :", token)  

    res.status(200).json({response : response, token : token})
    }
  
    catch(err){
      console.log(err)
      res.status(500).json({error: 'Internal server error'})
    }
     
  })
  
// Login page
router.post('/login', async(req,res)=> {
  try{
    // Extract username and password from request body
    const {username, password} = req.body

  // Find the user by username
  const user = await Person.findOne({username: username})

  // If user doesnot exist or password doesnot match, return error
  if(!user || !(await user.comparePassword(password))){
    return res.status (401).json({error: 'Invalid username or password'})
  }

  // Generate Token
  const payload = {
    id: user.id,
    username: user.username
  }

  const token = generateToken(payload) 

  // Return token as response
  res.json({token})
  }

  catch(err){
    console.log(err)
    res.status(500).json({error: 'Internal server error'})
  }
   
})





// POST route to add a Person
router.post('/:name', async(req,res)=> {
    try{
      const data = req.body // Assuming the request body contains the person data
  
    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data)
  
    // Save the new Person to the database
    const response = await newPerson.save()
    console.log('data saved.')
    res.status(200).json(response)
    }
  
    catch(err){
      console.log(err)
      res.status(500).json({error: 'Internal server error'})
    }
     
  })
  
// GET method to get the person
router.get('/', async (req,res)=> {
   try{
     const data = await Person.find()
     console.log('data fetched sucessfully.')
     res.status(200).json(data)
   }
 
   catch(err){
     console.log(err)
     res.status(500).json({error: 'Internal server error'})
   }
 })
 
router.get('/:namefind', async (req,res)=> {
  try{
     const namefind = req.params.namefind // Extract the name from the URL 
     if(namefind == 'shyam' || namefind == 'karki' || namefind == 'Mohit Kumar'){
       const response = await Person.find({name: namefind})
       console.log('response fetched sucessfully.')
       res.status(200).json(response)
     } else{
       res.status(404).json({error: 'Invalid Name Type'})
     }
   }
 
  catch(err){
    console.log(err)
    res.status(500).json({error: 'Internal server error'})
  }
 })

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id // Extract the id from the URL 
        const updatePersonData = req.body // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
            new : true, // Return the updated Document
            runValidators: true, // Run Mongoose Validation
        })

        if(!response) {
          return res.status(404).json({error: 'Person not found'})
        } 

        console.log('Data Updated')
        res.status(200).json(response)
    }
    
    catch(err){
       console.log(err)
       res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id // Extract the id from the URL 

        // Assuming you have a Person Model
        const response = await Person.findByIdAndDelete(personId)

        if(!response) {
          return res.status(404).json({error: 'Person not found'})
        } 

        console.log('Data Delete')
        res.status(200).json({message: "Person Deleted Successfully."})
    }
    
    catch(err){
       console.log(err)
       res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router

 
// comment