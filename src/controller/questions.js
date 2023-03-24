import { Bot } from "../model/bot";
import { responseHandler } from "../response/response-handler";

export const questions = async (req, res) => {
  try {
    const words = ["api", "functions", "available", "nodejs"];
    const answer =
      "Asynchronous, Non-blocking functions,Synchronous, Blocking functions";
    const question = await Bot.create({
      keywords: words,
      answer: answer,
    });
    return responseHandler(
      res,
      200,
      "Question added successfully",
      true,
      question
    );
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, error.message, false);
  }
};
