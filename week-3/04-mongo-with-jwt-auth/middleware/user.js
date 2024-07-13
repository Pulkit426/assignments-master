const jwt = require("jsonwebtoken");
const secretKey = "SECRET";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const authValue = req.headers["authorization"];

  if (!authValue) res.json({ Error: "Provide Authentication Token in header" });

  const token = authValue.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      req.username = decoded.username;
      next();
    }
  } catch (e) {
    res.json({ Error: e });
  }
}

module.exports = userMiddleware;

