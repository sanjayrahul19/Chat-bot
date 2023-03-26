import express from "express";
import { answer } from "../controller/answer";
import { addData } from "../controller/insert";
import { questions } from "../controller/questions";

export const router = express.Router();

router.post("/questions", questions);
router.get("/answers", answer);
router.post("/add", addData);
