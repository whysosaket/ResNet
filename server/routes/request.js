import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Agency from "../models/Agency.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";
import fetchagency from "../middleware/fetchagency.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const generateRequestID = () => {
  const id = "RQ" + Math.floor(Math.random() * 1000000);
  return id;
};

router.post(
  "/",
  [body("category", "category cannot be empty").isArray({ min: 1 })],
  fetchuser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const categories = req.body.category;
      const location = req.body.location;
      const victims = req.body.victims;
      const severity = req.body.severity;
      const details = req.body.details;
      const image = req.body.image;

      let agencies = await Agency.find({}, "location category agencyID");
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
        type: categories,
        agency: finalAgencies,
        requestID: requestID,
        victims,
        severity,
        details,
        image,
      });
      const data = {
        request: {
          id: request.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res.json({ success, request });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/latest", fetchagency, async (req, res) => {
    try {

        let agency = await Agency.findById(req.agency.id);
        if (!agency) {
            return res.status(404).json({ success: false, error: "No such agency found" });
        }

        let requests = await Request.find({}).sort({ date: -1 });
        requests = requests.filter((req) => req.status === "pending");
        if(requests.length<=0) return res.json({success: false, requests: []})
        requests = requests[0];

        // calculating distance
        let distance = getDistanceFromLatLonInKm(
            requests.location[0],
            requests.location[1],
            agency.location[0],
            agency.location[1]
        );

        // add distance to request
        requests.distance = distance;
        return res.json({ success: true, requests: requests, distance: distance.toFixed(2) });
    }
    catch (error) {
        console.log(error)
    }
});

router.post("/accept", fetchagency, async (req, res) => {
    try {
        const redid = req.body.requestID;
        console.log(redid);
        const request = await Request.findOne({ requestID: redid });
        const agency = await Agency.findById(req.agency.id);
        if (!request) {
            return res.status(404).json({ success: false, error: "No such request found" });
        }
        if (!agency) {
            return res.status(404).json({ success: false, error: "No such agency found" });
        }
        request.status = "accepted";
        await request.save();
        return res.json({ success: true, request: request });
    }
    catch (error) {
        console.log(error)
    }
});

router.post("/reject", fetchagency, async (req, res) => {
    try {
        const redid = req.body.requestID;
        console.log(redid);
        const request = await Request.findOne({ requestID: redid });
        const agency = await Agency.findById(req.agency.id);
        if (!request) {
            return res.status(404).json({ success: false, error: "No such request found" });
        }
        if (!agency) {
            return res.status(404).json({ success: false, error: "No such agency found" });
        }
        request.status = "reject";
        await request.save();
        return res.json({ success: true, request: request });
    }
    catch (error) {
        console.log(error)
    }
});

router.get('/ph', async(req,res)=>{
    try {
        const requests = await Request.findById("6506be11f40c2afd99d356d9")
        return res.json({requests: requests})
    } catch (error) {
        console.log(error)
    }
    });


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
};

export default router;
