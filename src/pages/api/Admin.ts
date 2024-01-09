/*
import express from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_Secret;
import { Admins, Courses } from "../database/database";
import { authenticateUser } from "../middlewares/auth";

const router = express.Router();
//-----------------------Admin Routes-----------------------//

router.get("/me", authenticateUser, (req, res) => {
  const { userEmail } = req.headers;
  const email = userEmail;
  if (email) {
    res.status(200).json({ email });
  } else {
    res.status(404).json({ message: "Invalid email" });
  }
});

//Admin singup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ message: "Please Enter your Email or Password Correctly." });
  } else {
    const existingUser = await Admins.findOne({
      email: email,
      password: password,
    });

    if (existingUser) {
      res.status(400).json({ message: "Admin already exists!" });
    } else {
      const obj = { email, password };
      await Admins.create(obj);
      if (!secretKey) {
        console.log("Token missing or malformed secret key");
        return res
          .status(401)
          .json({ message: "Token missing or malmalformed secret key" });
      }
      const token = jwt.sign(obj, secretKey, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .json({ message: "Admin created successfully", token: token });
    }
  }
});

//Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Invalid email or password" });
  } else {
    const existingUser = await Admins.findOne({
      email: email,
      password: password,
    });
    if (existingUser) {
      if (!secretKey) {
        console.log("Token missing or malformed secret key");
        return res
          .status(401)
          .json({ message: "Token missing or malmalformed secret key" });
      }
      const token = jwt.sign({ email, password }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Logged in successfully", token: token });
    } else {
      res.status(401).json({ message: "Please Signup First!" });
    }
  }
});

//Admin Creates newer Course
router.post("/course", authenticateUser, async (req, res) => {
  const newCourse = req.body;
  await Courses.create(newCourse);
  res
    .status(200)
    .json({ message: "Course Created successfully", course: newCourse });
});

//Admins Edit an existing Course
// router.put("/course/:id", authenticateUser, async (req, res) => {
//   const newCourse = req.body;
//   const courseId = req.params.id;

//   if (!isValidObjectId(courseId)) {
//     return res.status(400).send({ message: "Invalid course ID format" });
//   }

//   try {
//     const existingCourse = await Courses.findOne({ _id: courseId });
//     if (existingCourse) {
//       await Courses.updateOne(existingCourse, newCourse);
//       const updatedCourse = await Courses.findOne({ _id: courseId });
//       res.status(200).json({
//         message: "Course Updated successfully",
//         course: updatedCourse,
//       });
//     } else {
//       res.status(400).send({ message: "Course not found!" });
//     }
//   } catch (err) {
//     console.log("Error updating course " + err);
//     res.status(500).send({ message: "Internal Server Error please try again" });
//   }
// });
router.put("/course/:id", authenticateUser, async (req, res) => {
  const newCourseData = req.body;
  const courseId = req.params.id;

  // Validate newCourseData here (e.g., check required fields, types, etc.)

  if (!newCourseData || !courseId) {
    return res.status(400).send({ message: "Invalid course ID format" });
  }

  try {
    const existingCourse = await Courses.findById(courseId);
    if (!existingCourse) {
      return res.status(404).send({ message: "Course not found!" });
    }
    try {
      const updatedCourse = await Courses.findByIdAndUpdate(
        courseId,
        newCourseData,
        { new: true }
      );
      res.status(200).json({
        message: "Course Updated successfully",
        course: updatedCourse,
      });
    } catch (updateError) {
      console.error("Error updating course:", updateError);
      res.status(500).send({ message: "Error updating course" });
    }
  } catch (findError) {
    console.error("Error finding course:", findError);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Admin can Excess All the courses
router.get("/course", authenticateUser, async (req, res) => {
  const courses = await Courses.find({});
  res.status(200).json(courses);
});

//Admin can delete the course
router.delete("/course/:courseId", authenticateUser, async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const deleteCourse = await Courses.deleteOne({ _id: courseId });

    if (deleteCourse.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json({ message: "Course successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default router;

*/
