const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "5678" });
});

app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`.cyan);
});
