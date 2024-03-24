const express = require('express')
const router = express.Router()
const fetchUserID = require('../middleware/fetchUserID');
const Cart_model = require("../models/Cart");
const Cart = require('../models/Cart');


// DISPLAY  CART USING GET /cart/displaycart

router.get("/displaycart",fetchUserID,async(req,res)=>{

  let success = false;

  try{



    let cart = await Cart_model.find({user:req.user.id})

    if (!cart){
      return res.status(400).json({success,error:"Not Allowed"})
  }

    

    success = true;

    res.json({success,cart})

  }catch(error){
    console.json({success,error:error.message})
  }

   

})


// ADD TO CART USING POST /cart/addtocart


router.post("/addtocart",fetchUserID,async(req,res)=>{

  let success = false;

  try{

    let cart = await Cart_model.create({
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      user:req.user.id
    });

    success = true;

    res.json({success,cart})

  }catch(error){
    console.json({success,error:error.message})
  }

   

})

// DELETE FROM CART USING PUT /cart/deletefromcart

router.delete("/deletefromcart/:id",fetchUserID,async(req,res)=>{

  let success = false;

  try{

    let product = await Cart_model.findById(req.params.id)

    if (!product){

      return res.status(400).json({success,error:"This Product does not exist"})
    }

    if (req.user.id!==product.user.toString()){
      return res.status(400).json({success,error:"Not Allowed"}) // This item does not belong to your cart and you cant delete the item from someone else's cart 
  }
    
  let deleted_product =  await Cart_model.findByIdAndDelete(req.params.id)

    success = true;

    res.json({success,deleted_product})

  }catch(error){
    console.json({success,error:error.message})
  }

   

})











module.exports = router