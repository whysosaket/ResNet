import dotenv from 'dotenv'
dotenv.config();
import express from 'express'

import cors from 'cors';
import connectDB from './database.js';

connectDB();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.route("/").get( (req, res)=>{
    res.send("Hellow");
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;