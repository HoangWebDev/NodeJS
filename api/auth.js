const jwt = require("jsonwebtoken");
const jwtSecret = "techphone";
exports.adminAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Không vào được. Thiếu token",
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, dataDecoded) => {
    if (err)
      return res.status(401).json({
        message: "Token không hợp lệ",
      });
    if (dataDecoded.role !== 1) {
      return res.status(401).json({
        message: "Bạn không phải admin",
      });
    } else next();
  });
};

exports.userAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Không là token",
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, dataDecoded) => {
    if (err)
      return res.status(401).json({
        message: "Token không hợp lệ",
      });
    else next();
  });
};
