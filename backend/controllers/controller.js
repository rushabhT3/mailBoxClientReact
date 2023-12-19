const jwt = require("jsonwebtoken");

const User = require("../models/model");
const Mail = require("../models/mail");

const helloWorld = (req, res) => {
  res.send("Hello, World!");
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your-secret-key",
      {
        expiresIn: "1h", // ? Token expiration time
      }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const compose = async (req, res) => {
  try {
    const { sender, receiver, subject, content } = req.body;
    if (!sender || !receiver || !subject || !content) {
      return res.status(400).json({
        message: "Sender, receiver, subject, and content are required",
      });
    }
    const mail = await Mail.create({
      sender,
      receiver,
      subject,
      content,
    });
    res.status(201).json({
      message: "Mail successfully sent",
      mail: mail,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while sending the mail",
      error: error.message,
    });
  }
};

const findMailBySender = async (req, res) => {
  try {
    const { sender } = req.query;
    if (!sender) {
      return res.status(400).json({
        message: "Sender is required",
      });
    }
    const mails = await Mail.findAll({
      where: {
        receiver: sender,
      },
    });

    res.status(200).json({
      message: "Emails found by sender successfully",
      emails: mails,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while finding emails by sender",
      error: error.message,
    });
  }
};

module.exports = { signUp, helloWorld, login, compose, findMailBySender };
