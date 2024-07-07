const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const router = express.Router();
// import { json } from "express";

const executePython = async (script, args) => {
  console.log("Inside executePython");
  const arguments = args.map((arg) => arg.toString());

  const py = spawn("python", [script, ...arguments]);

  console.log("After py");

  let result = "";

  py.stdout.on("data", (data) => {
    console.log("About to print data");
    // const decoder = new TextDecoder('utf-8')
    // const decodedString = Buffer.from(data, 'utf-8').toString();
    console.log(data);
    result += data.toString();
    // console.log(result)
  });

  py.stderr.on("data", (data) => {
    console.error(`[python] Error occurred: ${data}`);
  });

  return new Promise((resolve, reject) => {
    py.on("exit", (code) => {
      console.log("Aman");
      console.log(`Child process exited with code ${code}`);
      if (code === 0) {
        resolve(result);
      } else {
        reject(`Error occurred in ${script}`);
      }
    });
  });
};

router.get("/", async (req, res) => {
  console.log("Inside SIMILAR PRODUCT");
  try {
    const product = req.query.searchTerm;
    // const reqProduct = JSON.parser(product);

    console.log("Product at Similar Product server: " + product);

    const scriptPath = path.join(__dirname, "..", "python", "google_scrap.py");
    // const scriptPath = "/python/similar_products.py";
    // const result = await executePython(scriptPath, ["camera"]);
    const result = await executePython(scriptPath, [product]);

    console.log("Result from Python script:", result);

    res.json({ result: result });
  } catch (error) {
    console.log("Inside catch block of router.get");
    res.status(500).json({ error: error });
    console.log(error);
  }
});

module.exports = router;
