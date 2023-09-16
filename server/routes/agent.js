import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Agent from "../models/Agent.js";
import Agency from "../models/Agency.js";
import fetchagency from "../middleware/fetchagency.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const generateAgentID = () => {
  // id should be two capital letters followed by 6 digits
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 6; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
};

//Route-1 Fetching all agents
router.get("/fetchagent", fetchagency, async (req, res) => {
  try {
    const agent = await Agent.find({ agency: req.agency.id });
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Some internal error occurred" });
  }
});

//Route-2 Agent Registration
router
  .route("/register")
  .post(
    [
      body("name").isLength({ min: 3 }),
      body("email", "Enter a valid email").isEmail(),
      body("password").isLength({ min: 5 }),
      body("mobile", "Enter a valid Number").isLength({ min: 10 }),
    ],
    fetchagency,
    async (req, res) => {
      // Validating if email/password/name is acceptable
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let success = false;

      // Validating if the account exist or not
      const agency = await Agency.findById(req.agency.id);
      if (!agency) {
        return res
          .status(400)
          .json({ success, error: "Could Not Find Agency!" });
      }

      try {
        // Saving body data into constants

        let agent = await Agent.findOne({ email: req.body.email });
        if (agent) {
          return res
            .status(400)
            .json({ error: "Agent with the same email exists" });
        }
        const { name, email, password, mobile } = req.body;

        // agent ID = some letters+ 6 digit random number
        const agentID = generateAgentID();

        agent = await Agent.findOne({ agentID: agentID });
        while (agent) {
            agentID = generateAgentID();
            agent = await Agent.findOne({ agentID: agentID });
        }

        var salt = bcrypt.genSaltSync(10);
        var secPass = bcrypt.hashSync(password, salt);

        agent = await Agent.create({
          agency: req.agency.id,
          name,
          password: secPass,
          email,
          mobile,
          agentID,
        });

        const data = {
          agent: {
            id: agent.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);

            res.json({agent: agent});
      } catch (error) {
        console.log(error);
        res.json({ error: "Something Went Wrong!" });
      }
    }
  );

//Route-2
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Finding the Agent with the provided email
      let agent = await Agent.findOne({ email: email });
      if (!agent) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      //Checking the password
      const passwordCompare = await bcrypt.compare(password, agent.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const data = {
        agent: {
          id: agent.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({token: authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some internal error occurred" });
    }
  }
);

export default router;
