// Middleware for handling auth
const jwt = require("jsonwebtoken");
const secretKey = "SECRET";

function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const authValue = req.headers["authorization"];

  if (!authValue) res.json({ Error: "Provide Authentication Token in header" });
  const token = authValue.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded) next();
  } catch (e) {
    res.json({ Error: e });
  }
}

module.exports = adminMiddleware;

