const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const newUser = new Admin({ username, password });
  newUser.save();

  res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink, published } = req.body;
  const newCourse = new Course({
    title,
    description,
    price,
    imageLink,
    published,
  });
  const newCourseResponse = await newCourse.save();
  res.json({
    message: "Course created successfully",
    courseId: newCourseResponse._id,
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find({}).then((courses) => res.json({ courses }));
});

module.exports = router;

