const express = require("express");
const router = express.Router();

const { helloWorld, signUp, login, compose, findMailBySender } = require("../controllers/controller");

// define the home page route
router.get("/", helloWorld);

router.post("/signUp", signUp);

router.post("/login", login);

router.post('/compose', compose)

router.get('/findMails', findMailBySender)

module.exports = router;
