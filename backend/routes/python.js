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
        // const decoder = new TextDecoder('utf-8')
        // const decodedString = Buffer.from(data, 'utf-8').toString();
        console.log(data)
        result+=data.toString();
        // console.log(result)
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

router.get('/', async (req, res) => {
    try {

        const searchTerm = req.query.searchTerm;

        console.log("About to print Input")

        console.log(searchTerm)

    const scriptPath = path.join(__dirname, '..', 'python', 'script.py');
        // const result = await executePython(scriptPath, ["camera"]);
        const result = await executePython(scriptPath, [searchTerm]);

        console.log("Result from Python script:", result );

        

        res.json({ result: result });
    } catch (error) {
        console.log("Inside catch block of router.get")
        res.status(500).json({ error: error });
        console.log(error)
    }
});

module.exports = router