const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  newUser.save();

  res.json({ message: "User created successfully" });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find({}).then((courses) => res.json({ courses }));
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const { username } = req.headers;

  try {
    const courseExists = await Course.findById(courseId);
    if (!courseExists)
      res.json({ Error: "Invalid Course: Try purchasing a valid course" });

    const userDetails = await User.findOne({ username });
    if (userDetails.purchasedCourses)
      userDetails.purchasedCourses.push(courseId);
    else userDetails.purchasedCourses = [courseId];
    await userDetails.save();

    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    res.json({ Error: err.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;
  const userDetails = await User.findOne({ username }).populate(
    "purchasedCourses"
  );
  res.json({
    purchasedCourses: userDetails.purchasedCourses,
  });
});

module.exports = router;

