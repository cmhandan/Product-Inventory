const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const { generateJwt, verifyJwt } = require("../utils/JwtAuth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isCorrect = bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(404).send("Passpowrd failure");
    }
    const token = generateJwt({ name: user.name, email, role: user.role});
    res.status(200).json({
      message: "User LogeedIn successfully!!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
      message: "Unable to login",
    });
  }
};
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User registration failed",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();
    const token = generateJwt({ name, email });
    res.status(201).json({
      message: "User registered successfully!!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
      message: "User Registration Failed",
    });
  }
};

const juniorSecret = (req, res) => {
    console.log("junior:",req.user.role);
  try {
    if (req.user.role !== "JUNIOR") {
      return res.status(403).json({
        message: " User not authorized to access this!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      secret: `Your junior ${req.user.name} loves reading manga`,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
      message: "Failed to deciper junior Secret",
    });
  }
};

const seniorSecret = (req, res) => {
  try {
    if (req.user.role != "SENIOR") {
      return res.status(403).json({
        message: " User not authorized to access this!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      secret: `Your senior ${req.user.name} loves reading manhwa`,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
      message: "Failed to peek senior secret",
    });
  }
};

const teacherSecret = (req, res) => {
  try {
    if (req.user.role != "TEACHER") {
      return res.status(403).json({
        message: " User not authorized to access this!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      secret: `Your teacher ${req.user.name} loves your mam!!`,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
      message: "Failed to uncover teacher secret",
    });
  }
};

module.exports = {
  login,
  register,
  juniorSecret,
  seniorSecret,
  teacherSecret,
};
