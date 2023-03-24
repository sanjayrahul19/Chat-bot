import { Bot } from "../model/bot";
import { responseHandler } from "../response/response-handler";

export const answer = async (req, res) => {
  try {
    let word = req.body.question;
    const words = word.split(" ");
    console.log(words, "words");

    let result = [];

    for (let i = 0; i < words.length; i++) {
      let answer = await Bot.find({
        keywords: { $regex: words[i], $options: "i" },
      });

      let count;
      console.log(count, "COUNT before loop");

      if (answer[i] !== undefined) {
        // console.log(answer[i])
        const key = answer[i].keywords;
        console.log(key, "key");

        for (let j = 0; j < key.length; j++) {
          count = 0;
          console.log(j, "== j");
          if (words[j] === key[j]) {
            console.log(words[j], " ===words");
            console.log(key[j], " ===keys");
            count++;
            console.log(count, "INside block count");
          }
          if (words.length - 1 === j && count > 0) {
            result.push(answer[i]);
          }
        }
      }
      console.log(count, "COUNT after loop");
      console.log(result);
    }

    return responseHandler(res, 200, "Answer sent successfully", true, result);
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, error.message, false);
  }
};
