const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const secretKey = "SECRET";
// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const user = new Admin({ username, password });
  user.save();

  res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const response = await Admin.findOne({ username, password });
  if (response) {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token: token });
  } else res.json({ Error: "Can't Sign In - Invalid Credentials" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink, published } = req.body;

  const course = new Course({
    title,
    description,
    price,
    imageLink,
    published,
  });
  const response = await course.save();

  res.json({ message: "Course created successfully", courseId: response._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.json({ courses: courses });
});

module.exports = router;

