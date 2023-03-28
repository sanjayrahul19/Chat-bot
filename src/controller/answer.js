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
      console.log(answer, "answer");

      result.push(...answer); //splits objects in an array and push in new array

      if (words.length - 1 === i) {
        const unique = result.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        );
        console.log(result, "result");
        console.log(unique, "unique");

        const count = {};

        const ans = result.forEach((obj) => {
          const id = obj.id;
          if (unique.some((item) => item.id === id)) {
            count[id] = (count[id] || 0) + 1;
            console.log(count[id], "count");
          }
        });
        console.log(count);

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
        console.log(object, "obj");
        return responseHandler(
          res,
          200,
          "Answer sent successfully",
          true,
          object
        );
      }
    }
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, error.message, false);
  }
};
