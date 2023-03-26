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

      result.push(...answer); //splits objects in an array and push in new array

      // console.log(answer, "answer");

      if (words.length - 1 === i) {
        const unique = result.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        );
        console.log(result, "result");
        console.log(unique, "unique");
        return responseHandler(
          res,
          200,
          "Answer sent successfully",
          true,
          unique[0]
        );

        // const existingIds = unique
        //   .filter((obj) => {
        //     const matchingIds = result.filter((item) => item.id === obj.id);
        //     // console.log(matchingIds, "len");
        //     return matchingIds.length;
        //   })
        // .map((obj) => obj);
        // console.log(existingIds, "existing",123);
        // return responseHandler(
        //   res,
        //   200,
        //   "Answer sent successfully",
        //   true,
        //   existingIds[0]
        // );

        // const count = {};

        // const ans = result.forEach((obj) => {
        //   const id = obj.id;
        //   if (unique.some((item) => item.id === id)) {
        //     count[id] = (count[id] || 0) + 1;
        //     console.log(count[id],"count")
        //   }
        // });
        // console.log(count);

        // for (let i = 0; i < result.length; i++) {
        //   for (let j = 0; j < unique.length; j++) {
        //     if (result[i].id === unique[j].id) {
        //       count++;
        //       if (result.length - 1 === count > 0) {
        //         finalResult.push(result[i]);
        //       }
        //     }
        //   }
        // }
      }
    }
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, error.message, false);
  }
};
