const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator'); // using express-validator version 6.12.0!
const User_model = require('../models/User')
let bcrypt = require('bcryptjs');
// json tokeb

// CREATE USER USING POST /auth/createuser

router.post('/createuser',[
    body('email').isEmail(),
  body('password','Password should be atleast 5 characters long').isLength({ min: 5 }),
],async(req,res)=>{

    let success = false;

    try{

        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }


    let user = await User_model.findOne({email:req.body.email})

    if (user){

        return res.status(400).json({ success,error: "User with this email already exists" });
    }


    let salt = await bcrypt.genSalt(10); // without using await I was encountering error -> "Illegal arguments: string, object"
    let secure_password = bcrypt.hashSync(req.body.password, salt);


     user = await User_model.create({
        email: req.body.email,
        name: req.body.name,
        // password: req.body.password, // database should not contain actual password, hence we user bcrypt
        password: secure_password, // database should not contain actual password, hence we user bcrypt
      });


      success = true;
   

      res.json({success,user})


    }catch(error){

        return res.status(400).json({ success,error: error.message});
    }

    
})

// LOGIN USER USING POST /auth/loginuser

router.post('/loginuser',[
    body('email').isEmail(),
    body('password','Password cannot be empty').exists(), // since you dont want to tell the user that min length of password is 5 units during login process
],async(req,res)=>{



    let success = false;

    try{

        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }


    let user = await User_model.findOne({email:req.body.email})

    if (!user){

        return res.status(400).json({ success,error: "Please Enter Valid Login Credentials" });
    }

    // user with this email exists hence access the password stored in database with the password in user's request

    const Password_compare = await bcrypt.compare(req.body.password,user.password) // arguments for compare function -> s: string, hash: string (user.password) hence it matches all hashes internally




    if (!Password_compare){
        return res.status(400).json({ success,error: "Please Enter Valid Login Credentials" });
    }

    success = true;

    res.json({success,message:"Logged In Successfully"})



   




    }catch(error){

        return res.status(400).json({ success,error: error.message});
    }

})

module.exports = router