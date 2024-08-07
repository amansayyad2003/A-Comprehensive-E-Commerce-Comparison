const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  date:{
    type:Date,
    default:Date.now()
  },

  history: [{
    query: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
  
});

module.exports = mongoose.model("user",userSchema) // create a model user using userSchema