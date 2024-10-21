const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Ensure you have a secret key in your environment variables

const checkAuthToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    req.user = decoded; // Attach decoded token data to the request object
    next();
  });
};

module.exports = checkAuthToken;
