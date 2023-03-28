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

    // const words = data.message.split(" ");
    const words = data.split(" ");
    console.log(words, "words");

    let word = ["what", "is", "the", "how", "where", "who"];

    const wordUnique = words.filter(
      (item, index) => index === word.findIndex((t) => t === item)
    );
    // console.log(wordUnique, "wordUnique");
    if (words > wordUnique) {
      let answers = await Bot.find({});
      // console.log(answers, "answers");

      let docs = [];

      for (let i = 0; i < answers.length; i++) {
        const keyword = answers[i].keywords;

        console.log(keyword, "keyword");

        for (let j = 0; j < keyword.length; j++) {
          const result = keyword[j];
          console.log(result, "result");

          for (let k = 0; k < words.length; k++) {
            if (result === words[k]) {
              docs.push(answers[i]);
            }
            if (answers < 1) {
              Socket.emit("received_message", "Sorry i couldn't understand");
            } else {
              if (words.length - 1 === k) {
                const unique = docs.filter(
                  (obj, index, self) =>
                    index === self.findIndex((t) => t.id === obj.id)
                );
                console.log(unique, "unique");

                let count = {};

                const ans = docs.forEach((obj) => {
                  const id = obj.id;
                  console.log("hhelloooooqqqq");
                  if (unique.some((item) => item.id === id)) {
                    count[id] = (count[id] || 0) + 1;
                    console.log(count[id], "countId");
                  }
                });
                console.log(count, "count");

                let maxCount = 0;
                let maxId;

                for (const id in count) {
                  if (count[id] > maxCount) {
                    maxCount = count[id];
                    maxId = id;
                  }
                }
                console.log(maxId, "id");

                const object = await Bot.findOne({ _id: maxId });
                console.log(object, "object");
                console.log(object.answer, "answer");
                Socket.emit("received_message", object.answer);
              }
            }
          }
        }
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
