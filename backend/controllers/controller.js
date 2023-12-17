const User = require("../models/model");

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
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, helloWorld, login };
