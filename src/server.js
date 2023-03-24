import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { router } from "./router/router";
import { connectDB } from "./config/db";

const app = express();
const PORT = 8000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api/v1/bot", router);
connectDB();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (Socket) => {
  console.log("connected");

  Socket.on("send_message", (data) => {
    Socket.emit("received_message", "hello");
    console.log(data.message);
  });

  Socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server is up and running");
});
