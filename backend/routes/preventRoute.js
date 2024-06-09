const jwt = require("jsonwebtoken");

exports.preventRoute = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(403).json("Unauthorized");
  }
  jwt.verify(token, process.env.jwt_token, (err, user) => {
    if (!user) {
      res.status(403).json("Unauthorized");
    }
    req.user = user;
    next();
  });
};
