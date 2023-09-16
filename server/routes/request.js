import dotenv from "dotenv"
dotenv.config();
import express from "express"
import Agency from "../models/Agency.js";
import User from "../models/User.js";
import Request from "../models/Request.js"
import {body , validationResult} from "express-validator"
import jwt from "jsonwebtoken"

const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET;
let agencies=[];

router.post("/", [
    body('category', 'category cannot be empty').isArray({min:1})
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const categories= req.body.category;
        const location= req.body.location;
        categories.forEach(async (type) => {
            let agency=await Agency.find({category:[type]})
            findAgency(agency, location,type);
            
            
        });
        let request= await Request.create({
            user:req.body.user,
            location,
            category:categories, 
            agency :agencies
        })
        const data={
            request:{
                id:request.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
        res.json(request)
        
        
    } catch (error) {
        console.log(error)
    }
    
        
    
})

const findAgency=async(agency,location,type)=>{
    
    agency.forEach(async (element) => {
        let dis=(Math.sqrt(Math.pow(element.location[0]-location[0], 2)+Math.pow(element.location[1]-location[1],2)))       
        let m=await Agency.findOneAndUpdate({name:[element.name]},{distance:dis})
        

    });
    agency=await Agency.find({category:[type]})
    // console.log(agency)
    if(agency.length<=4){
        agency.forEach(element => {
            
            agencies.push(element)
        });
        
    }else {
        agency.sort((a, b) => {
            return a.dis - b.dis;
        });
        for(let i=0;i<=3;i++)
        agencies.push(agency[0]);
    }
    
    
}

export default router;