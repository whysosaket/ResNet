import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from "./routes/auth.js";
import agencyRouter from "./routes/agency.js";
import agentRouter from "./routes/agent.js";
import requestRouter from "./routes/request.js"

// import router from './routes';

import cors from 'cors';
import connectDB from './database.js';

connectDB();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// app.use('/', router());
app.route("/").get( (req, res)=>{
    res.send("Hello");
})
app.use("/api/auth", authRouter);
app.use("/api/agency", agencyRouter);
app.use("/api/agent", agentRouter);
app.use("/api/request",requestRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;