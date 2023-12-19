const express = require("express");
const router = express.Router();

const {
  helloWorld,
  signUp,
  login,
  compose,
  findMailBySender,
} = require("../controllers/controller");
const { deleteEmail, markAsRead } = require("../controllers/individual");

router.get("/", helloWorld);

router.post("/signUp", signUp);

router.post("/login", login);

router.post("/compose", compose);

router.get("/findMails", findMailBySender);

router.delete("/deleteEmail/:emailKiId", deleteEmail);

router.post("/markAsRead", markAsRead);

module.exports = router;
