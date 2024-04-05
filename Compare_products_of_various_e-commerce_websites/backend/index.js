// index.js is the entry point for backend
require("dotenv").config();
const express = require('express')
const app = express()
const port =  process.env.port || 3000

const connectToMongo = require('./db/connect')
const cors = require('cors')
app.use(cors())
app.use(express.json()) 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectToMongo()

 

app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/python',require('./routes/python'))

app.listen(port, () => {
  console.log(`Compare Craft listening on port http://localhost:${port}`)

})



/*
const express = require('express');
const { spawn } = require('child_process');
const port =  3000
const path = require('path');

const app = express();
app.use(express.json()) 
const executePython = async (script, args) => {
    const arguments = args.map(arg => arg.toString());

    const py = spawn("python", [script, ...arguments]);

    const result = await new Promise((resolve, reject) => {
        let output;

        // Get output from python script
        py.stdout.on('data', (data) => {
            output = JSON.parse(data);
        });

        // Handle erros
        py.stderr.on("data", (data) => {
            console.error(`[python] Error occured: ${data}`);
            reject(`Error occured in ${script}`);
        });

        py.on("exit", (code) => {
            console.log(`Child process exited with code ${code}`);
            resolve(output);
        });
    });

    return result;
}

app.get('/', async (req, res) => {
    try {
      const scriptPath = path.join(__dirname, 'python', 'script.py');
        const result = await executePython(scriptPath, [8, 5]);

        console.log("result")
        console.log(result)

        res.json({ result: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
*/