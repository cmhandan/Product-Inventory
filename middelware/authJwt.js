const jwt = require("jsonwebtoken");
const authJwt = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).send("Invalid jwt");
    }
  
    const user = jwt.verify(token, process.env.SECRET);
    if (!user) {
      res.status(402).json({
        message: "User not authenticated",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
        error,
        message: "Auth Failure"
    })
  }
};

module.exports = {
  authJwt,
};
