// const User = require("../models/model");
const Mail = require("../models/mail");

const deleteEmail = async (req, res) => {
  try {
    const { emailKiId } = req.params;
    console.log(emailKiId);
    if (!emailKiId) {
      return res
        .status(400)
        .json({ message: "Email ID is required for deletion." });
    }

    // ! correct this
    const email = await Mail.findOne({
      where: {
        id: emailKiId,
      },
    });
    if (!email) {
      return res.status(404).json({ message: "Email not found." });
    }
    await email.destroy();

    res.status(200).json({ message: "Email deleted successfully." });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({
      message: "An error occurred while deleting the email.",
      error: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { emailKiId } = req.body;
    if (!emailKiId) {
      return res.status(400).json({ message: "Email ID is required." });
    }
    const email = await Mail.findOne({ where: { id: emailKiId } });
    if (!email) {
      return res.status(404).json({ message: "Email not found." });
    }
    email.isRead = true;
    await email.save();

    res.status(200).json({ message: "Email marked as read successfully." });
  } catch (error) {
    console.error("Error marking email as read:", error);
    res.status(500).json({
      message: "An error occurred while marking the email as read.",
      error: error.message,
    });
  }
};

module.exports = { deleteEmail, markAsRead };
