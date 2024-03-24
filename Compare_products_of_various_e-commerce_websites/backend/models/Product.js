const mongoose = require('mongoose')
const { Schema } = mongoose;
// same as Product
const productSchema = new Schema({

    user:{
        // dusre object ki object id -> ye nahi samjha hai!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        type:mongoose.Schema.Types.ObjectId, // it is like foreign key which user made this product
        ref:'user' 
    
    },
  title:{
    type:String,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  image:
    {
        type:String
    },
  description:{
    type:String,
    require:true
  },
//   image:{
//     type:String,
//     default:"No image available"
//   },
  date:{
    type:Date,
    default:Date.now()
  },
});

module.exports = mongoose.model("product",productSchema) // create a model user using userSchema