import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./routes/auth.js";
import agencyRouter from "./routes/agency.js";
import agentRouter from "./routes/agent.js";
import requestRouter from "./routes/request.js";
import uploadRouter from "./routes/upload.js";
import http from "http";
import { Server } from "socket.io";

// import router from './routes';

import cors from "cors";
import connectDB from "./database.js";

connectDB();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// app.use('/', router());
app.route("/").get((req, res) => {
  res.send("Hello");
});
app.use("/api/auth", authRouter);
app.use("/api/agency", agencyRouter);
app.use("/api/agent", agentRouter);
app.use("/api/request", requestRouter);
app.use("/api/upload", uploadRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Socket.io
// create server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("Remessage", data);
  });

  socket.on("getGraph", async () => {
    // let graph = await sgetGraph();
    socket.broadcast.emit("graph", graph);
  });
});

io.listen(9001, () => {
  console.log("Socket listening on port 9001");
});

export default app;
