import { Bot } from "../model/bot";
import { responseHandler } from "../response/response-handler";
import fs from "fs";

export const addData = async (req, res) => {
  try {
   
    // const jsonData = JSON.parse(
    //   fs.readFileSync(`${__dirname}/` + "../data.json", "utf-8")
    // );
    const data = await Bot.create(jsonData);
    return responseHandler(res, 200, "Data added successfully", true, data);
  } catch (error) {
    console.log(error);
    return responseHandler(res, 200, error.message, false);
  }
};
