import dotenv from "dotenv"
dotenv.config();
import express from "express"
import bcrypt from "bcryptjs"
import {body, validationResult} from "express-validator"
import jwt from "jsonwebtoken"
import Agency from "../models/Agency.js"
const router =express.Router();
const JWT_SECRET= process.env.JWT_SECRET
import fetchagency from "../middleware/fetchagency.js";


const generateAgencyID = () => {
    const id = "AG" + Math.floor(Math.random() * 1000000);
    return id;
}


router.post("/register", [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('mobile', 'Enter a valid Number').isLength({min:10})
], async (req, res) => {
    // If there are any errors, return Bad Request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Checking if the Agency with same email exists
        let agency = await Agency.findOne({ email: req.body.email });
        if (agency) {
            return res.status(400).json({ error: "Agency with the same email exists" })
        }

        // agency ID = AG + 6 digit random number
        const agencyID = generateAgencyID();
        agency = await Agency.findOne({ agencyID: agencyID });
        while (agency) {
            agencyID = generateAgencyID();
            agency = await Agency.findOne({ agencyID: agencyID });
        }

        var salt = bcrypt.genSaltSync(10);
        var secPass = bcrypt.hashSync(req.body.password, salt);

        //Creating a new Agency
        agency = await Agency.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            mobile: req.body.mobile,
            location: req.body.location,
            address:req.body.address,
            category:req.body.category,
            agencyID: agencyID
        })
        const data={
            agency:{
                id:agency.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
        res.json({agency: agency})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some internal error occurred" })
    }

})

//Route-2 Agency LOGIN
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({min:5})
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}= req.body;
    try {
        //Finding the Agency with the provided email
        let agency= await Agency.findOne({email: email})
        if(!agency){
            return res.status(400).json({error:"Invalid Credentials"})
        }
        //Checking the password
        const passwordCompare=bcrypt.compare(password, agency.password)
        if(!passwordCompare){
            return res.status(400).json({error:"Invalid Credentials"})
        }
        const data={
            agency:{
                id:agency.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
        res.json({token: authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some internal error occurred" })
    }
})

//Route-3
router.post("/getagency" , fetchagency , async(req, res)=>{
    try {
        let agencyId=req.agency.id;
        const agency=await Agency.findById(agencyId).select("-password");
        res.send({agency: agency})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

export default router;