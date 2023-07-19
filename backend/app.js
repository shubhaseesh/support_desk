const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT;

connectDB()

app.get("/", (req, res) => {
  res.json({ message: "5678" });
});

app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`.cyan);
});
