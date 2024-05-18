// index.js is the entry point for backend
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 3000;

const connectToMongo = require("./db/connect");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (res) => {
  res.send("Hello World!");
});

connectToMongo();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/python", require("./routes/python"));
app.use("/api/simproduct", require("./routes/similarproducts"));

app.listen(port, () => {
  console.log(`Compare Craft listening on port http://localhost:${port}`);
});

