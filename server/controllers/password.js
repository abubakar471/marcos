const Password = require("../models/password");

const createPassword = async (req, res) => {
  const { userId, title, platform, email, password, optional } = req.body;

  try {
    if (!title) {
      return res.status(401).json({
        success: false,
        message: "Title Can't be empty",
      });
    }

    if (!platform) {
      return res.status(401).json({
        success: false,
        message: "Platform Can't be empty",
      });
    }

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "E-mail or username is required",
      });
    }

    if (!password) {
      return res.status(401).json({
        success: false,
        message: "Password is required",
      });
    }

    const newPassword = await Password.create({
      userId,
      title,
      platform,
      email,
      password,
      optional,
    });

    res.status(201).json({
      success: true,
      newPassword,
    });
  } catch (err) {
    console.log(
      "error in createPassword function in password controller => ",
      err
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getPasswords = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authenticated",
      });
    }

    const passwords = await Password.find({ userId }).select("-userId");
    res.status(200).json({
      passwords,
    });

  } catch (err) {
    console.log(
      "error whilte getting pssword in getPassword function => ",
      err
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createPassword,
  getPasswords,
};
