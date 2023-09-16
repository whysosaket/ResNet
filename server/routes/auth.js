import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
import fetchuser from "../middleware/fetchuser.js";

//Route-1 USER REGISTRATION

const generateUserID = () => {
    const id = "US" + Math.floor(Math.random() * 1000000);
    return id;
}

router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("mobile", "Enter a valid Number").isLength({ min: 10 }),
  ],
  async (req, res) => {
    // If there are any errors, return Bad Request with errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //Checking if the user with same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with the same email exists" });
      }

        // user ID = US + 6 digit random number
        const userID = generateUserID();

        user = await User.findOne({ userID: userID });
        while (user) {
            userID = generateUserID();
            user = await User.findOne({ userID: userID });
        }

      var salt = bcrypt.genSaltSync(10);
      var secPass = bcrypt.hashSync(req.body.password, salt);

      //Creating a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        mobile: req.body.mobile,
        userID: userID,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({user: user});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success, error: "Some internal error occurred" });
    }
  }
);

//Route-2 USER LOGIN
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Finding the user with the provided email
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({success, error: "Invalid Credentials" });
      }
      //Checking the password
      const passwordCompare =await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success, error: "Invalid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, token: authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success, error: "Some internal error occurred" });
    }
  }
);

//Route-3
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({user: user});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
