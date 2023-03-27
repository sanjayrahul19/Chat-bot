import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { router } from "./router/router";
import { connectDB } from "./config/db";
import { Bot } from "./model/bot";

const app = express();
const PORT = 8000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api/v1/bot", router);
connectDB();

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (Socket) => {
  console.log("connected");

  Socket.on("send_message", async (data) => {
    let result = [];

    const words = data.message.split(" ");
    console.log(words);

    for (let i = 0; i < words.length; i++) {
      let answer = await Bot.find({
        keywords: { $regex: words[i], $options: "i" },
      });
      result.push(...answer);
      if (words.length - 1 == i) {
        const unique = result.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        );
        console.log(unique, "unique");
        Socket.emit("received_message", unique[0].answer);
      }
    }
  });

  Socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server is up and running");
});
