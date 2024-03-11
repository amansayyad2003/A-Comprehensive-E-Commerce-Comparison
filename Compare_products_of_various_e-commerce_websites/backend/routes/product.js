const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator'); // using express-validator version 6.12.0!
const Product_model = require('../models/Product')
let bcrypt = require('bcryptjs');
const fetchUserID = require('../middleware/fetchUserID');
const JWT_SECRET = "This is a secret" // JWT SECRET should not be hardcoded
let jwt = require('jsonwebtoken');
const Product = require('../models/Product');

// CREATE product USING POST /product/createproduct
// but not anyone should be able to add product
router.post('/createproduct',fetchUserID,[
    body('title','Title cant be empty').exists(),
  body('description','Description cant be empty').exists(),
],async(req,res)=>{

    let success = false;

    try{

        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    
    
    
    let product = await Product_model.create({
        title: req.body.title,
        description: req.body.description,
        user:req.user.id // we are able to access the user who has inserted this product using the middleware which is returing data which has user's id
      });

      console.log(product)

    

      success = true;

      res.json({success,product})

    //   const data = { // sending user's id in data

    //     user:{
    //         id:user.id
    //     }
    //   }

    //   const authtoken = jwt.sign(data, JWT_SECRET); // sign user's id with secret string
   

    //   res.json({success,authtoken})


    }catch(error){

        return res.status(400).json({ success,error: error.message});
    }

    
})

// DELETE product USING POST /product/deleteproduct


router.post('/deleteproduct/:id',fetchUserID,async(req,res)=>{

    let success = false;

    try{

        let product = await Product_model.findById(req.params.id)

        if (!product){
            return res.status(400).json({ success,error: "This product does not exist"});
        }

        if (req.user.id!==product.user.toString()){
            return res.status(400).json({success,error:"You are Not Allowed to delete this product"})
        }

        let deleted_product = await Product_model.findByIdAndDelete(req.params.id)

        success = true;

        res.json({success,deleted_product})



    }catch(error){
        return res.status(400).json({ success,error: error.message});
    }
})

module.exports = router