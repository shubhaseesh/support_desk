const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.send({ data: "register" });
});
router.post("/login", (req, res) => {
    res.send({ data: "login" });
  });
module.exports = router;
