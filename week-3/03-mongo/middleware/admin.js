const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;

  try {
    const userExists = await Admin.findOne({ username });
    if (userExists && userExists.password === password) next();
    else res.status(401).json({ error: "Incorrect Credentials" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = adminMiddleware;
