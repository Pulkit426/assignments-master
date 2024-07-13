const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;

  const userExists = await User.findOne({ username, password });
  if (userExists) next();
  else res.status(401).json({ error: "Incorrect Credentials" });
}

module.exports = userMiddleware;

