const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const secretKey = "SECRET";

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save();

  res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const response = await User.findOne({ username, password });
  if (response) {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token: token });
  } else res.json({ Error: "Can't Sign In - Invalid Credentials" });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json({ Courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const username = req.username;

  const userDetails = await User.findOne({ username });
  userDetails.purchasedCourses.push(courseId);
  userDetails.save();

  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.username;
  const userDetails = await User.findOne({ username }).populate(
    "purchasedCourses"
  );

  res.json({ purchasedCourses: userDetails.purchasedCourses });
});

module.exports = router;

