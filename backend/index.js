const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "5678" });
});

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(
    `
  🚀 Server running on port ${PORT}!🚀
`.cyan
  );
});
