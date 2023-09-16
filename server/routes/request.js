import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Agency from "../models/Agency.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const generateRequestID = () => {
  const id = "RQ" + Math.floor(Math.random() * 1000000);
  return id;
};

router.post(
  "/",
  [body("category", "category cannot be empty").isArray({ min: 1 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const categories = req.body.category;
      const location = req.body.location;

      let agencies = await Agency.find({}, 'location category agencyID');
      let finalAgencies = [];

      agencies.forEach((ag) => {
        const distance = getDistanceFromLatLonInKm(
          location[0],
          location[1],
          ag.location[0],
          ag.location[1]
        );
        ag.distance = distance;
      });

      categories.forEach(async (type) => {
        let t_agencies = agencies.filter((ag) => ag.category.includes(type));
        t_agencies.sort((a, b) => a.distance - b.distance);
        // push top 3 agencies if available
        for (let i = 0; i < 2; i++) {
          if (t_agencies[i]) {
            finalAgencies.push(t_agencies[i]);
          }
        }
      });

      let requestID = generateRequestID();

      let reqS = await Request.findOne({ requestID: requestID });

      while (reqS) {
        requestID = generateRequestID();
        reqS = await Request.findOne({ requestID: requestID });
      }

      let request = await Request.create({
        user: req.body.user,
        location,
        category: categories,
        agency: finalAgencies,
        requestID: requestID,
      });
      const data = {
        request: {
          id: request.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      return res.json({ request });
    } catch (error) {
      console.log(error);
    }
  }
);

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    var d = R * c;
    return d;
    };
    
    const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
    }

export default router;
