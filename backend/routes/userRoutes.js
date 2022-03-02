const express = require('express');
const User = require('../model/user');
const router = express.Router();
var bcrypt = require('bcryptjs');

// router.get('/', (req, res)=>{
   
//     res.json({message : "all users"})

// })

router.get('/', async (req, res)=>{
   
    const users = await User.find()
    //to send in react
    res.json(users).status(200)
    console.log(users)

})


router.post('/', async (req, res)=>{
   
try{
   const user = new User(req.body)
   const createduser = await user.save()
   res.json({message : " user saved" , data: createduser}).status(201)
}
catch(error)
{
    console.log(error)
}


})

router.post('/login' , async (req , res) => {


    const { email , pass} = req.body
    const user = await User.findOne({email})
    if(user){

        const match = await bcrypt.compare(pass , user.password)

        if(match){
            res.json({message :"login successfully" , data : user})
        }

        else {
            res.json({message: "password does not match " , data : null})
        }

    }

    
    
})

router.post('/reg' , async (req , res) => {

console.log(req.body)
let {email , pass } = req.body

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(pass , salt);
console.log(hash)

if(hash){

    const  newUser = { email , password : hash}
    const newUserdb = await User.create(newUser)
    console.log(newUserdb)
    res.json({user : newUserdb , message :"new user created "}).status(201)
}


})

module.exports = router