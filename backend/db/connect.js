const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/CompareCraft"
const connectToMongo = async()=>{

    try{

        await mongoose.connect(mongoURL)

        console.log("Connected to Mongo successfully\n")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectToMongo