require("dotenv").config()
const connectToMongo = require('./db/connect')
const Product = require("./models/Product")
const mongoURL = "mongodb://localhost:27017"
const ProductJson = require("./products.json")

const start = async()=>{

    try{

        // await connectToMongo(process.env.MONGODB_URL) -> Not Working!!!!
        await connectToMongo()
        await Product.deleteMany()
        await Product.create(ProductJson)
        console.log("Successfully inserted data into the model Product")
    }catch(error){
        console.log(error)
    }
}

start();


