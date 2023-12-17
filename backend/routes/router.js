const express = require("express");
const router = express.Router();

const { helloWorld, signUp, login } = require("../controllers/controller");

// define the home page route
router.get("/", helloWorld);

router.post("/signUp", signUp);

router.post("/login", login);

module.exports = router;
