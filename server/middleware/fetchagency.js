import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"
const JWT_SECRET=process.env.JWT_SECRET;

const fetchagency=(req, res, next)=>{
    const token=req.header("auth-token");
    if(!token)
        res.status(401).send({error:"Please authenticate using a valid token"});
    try {
        const data=jwt.verify(token , JWT_SECRET);
        req.agency=data.agency;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}
export default fetchagency;