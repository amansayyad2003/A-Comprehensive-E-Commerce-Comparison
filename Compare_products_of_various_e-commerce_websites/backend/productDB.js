require("dotenv").config()
const connectToMongo = require('./db/connect')
const Product = require("./models/Product")
const mongoURL = "mongodb://localhost:27017"

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router()


const executePython = async (script, args) => {
    console.log("Inside executePython")
    const arguments = args.map(arg => arg.toString());

    const py = spawn("python", [script, ...arguments]);

    console.log("After py")

    let result = '';

    py.stdout.on('data', (data) => {
        console.log("About to print data")    
        console.log(data)
        result+=data.toString();
    });

    py.stderr.on("data", (data) => {
        console.error(`[python] Error occurred: ${data}`);
    });

    return new Promise((resolve, reject) => {
        py.on("exit", (code) => {
            console.log("Sahhil")
            console.log(`Child process exited with code ${code}`);
            if (code === 0) {
                resolve(result);
            } else {
                reject(`Error occurred in ${script}`);
            }
        });
    });
}










const start = async()=>{

    try {

        const scriptPath = path.join(__dirname, 'python', 'script.py');
            let result = await executePython(scriptPath, ["camera"]);

            const cleanedStr = result.replace(/'/g, '"').replace(/,\s+/g, ',');

        // Parse the cleaned string as JSON
            const list = JSON.parse(cleanedStr);

            

        //    console.log(list)
    

             await connectToMongo()
            await Product.deleteMany()
            await Product.create(list)
            console.log("Succesfully inserted the data into the model Product")
        } catch (error) {
            console.log("Inside catch block of router.get")
            // res.status(500).json({ error: error });
            console.log(error)
        }
}

start();