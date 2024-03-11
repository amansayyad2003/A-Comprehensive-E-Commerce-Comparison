const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/CompareCraft"

const connectToMongo = async()=>{

    try{

        await mongoose.connect(mongoURI)

        console.log("Connected to Mongo successfully")

    }catch(error){

        console.log("Could not connect to Mongo")

    }
}

module.exports = connectToMongo