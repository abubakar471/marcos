const Password = require("../models/password");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const securityKey = process.env.CRYPTO_SECRET;

const encryptCredentials = (parameter) => {
  // cipher function to intiate cryptography
  const cipher = crypto.createCipher(algorithm, securityKey, initVector);

  // encrypt the message
  // input encoding
  // output encoding
  let encryptedData = cipher.update(parameter, "utf8", "hex");
  encryptedData += cipher.final("hex");

  return encryptedData;
}

const decryptCredentials = (parameter) => {
  // the decipher function
  const decipher = crypto.createDecipher(algorithm, securityKey, initVector);
  let decryptedData = decipher.update(parameter, "hex", "utf8");
  
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

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

    const hashedEmail = encryptCredentials(email);
    const hashedPassword = encryptCredentials(password);

    const newPassword = await Password.create({
      userId,
      title,
      platform,
      email : hashedEmail,
      password: hashedPassword,
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

    passwords.map(item => {
      const decryptedEmail = decryptCredentials(item.email);
      const decryptedPassword = decryptCredentials(item.password);
      
      item.email = decryptedEmail;
      item.password = decryptedPassword;

      return item;
    })

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
      message: err,
    });
  }
};

const deletePassword = async (req, res) => {
  const { id } = req.body;

  try {
    await Password.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Password deleted successfully"
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Password could not be deleted"
        })
      })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const updatePassword = async (req, res) => {
  const { id } = req.body;
  const data = {};

  if (req.body.title) {
    data.title = req.body.title;
  }

  if (req.body.platform) {
    data.platform = req.body.platform;
  }

  if (req.body.email) {
    data.email = req.body.email;
  }

  if (req.body.password) {
    data.password = req.body.password;
  }

  if (req.body.optional) {
    data.optional = req.body.optional;
  }

  try {
    const existed = await Password.findById(id);

    if (existed) {
      const updatedPassword = await Password.findByIdAndUpdate(id, data, { new: true });

      return res.status(200).json({
        success: true,
        message: "Updated Successfully"
      })
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const getSearchResults = async (req, res) => {
  const { searchQuery, userId } = req.params;

  if (!searchQuery || !userId) {
    return;
  }

  try {
    const result = await Password.find({
      userId: userId,
      $and: [
        {
          $or: [
            {
              title: { $regex: searchQuery, $options: 'i' }
            },
            {
              email: { $regex: searchQuery, $options: 'i' }
            },
            {
              platform: { $regex: searchQuery, $options: 'i' }
            }
          ]
        }
      ]
    });

    res.status(200).json({
      success: true,
      passwords: result
    })
  } catch (error) {
    console.log("error while searching for passwords in getSearchResults", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }

  // const fetcher = async(param) => {
  //   const result = await Password.find({
  //     $or: [
  //       { param: { $regex: searchQuery, $options: 'i' } }
  //   ]
  //   });

  //   return result;
  // }



  // const fetchByTitle = fetcher(title);

  // if(!fetchByTitle) {
  //   const fetchByPlatform = fetcher(platform);
  // }
}

module.exports = {
  createPassword,
  getPasswords,
  deletePassword,
  updatePassword,
  getSearchResults
};
