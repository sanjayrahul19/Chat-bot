import express from "express";
import { answer } from "../controller/answer";
import { questions } from "../controller/questions";

export const router = express.Router();

router.post("/questions", questions);
router.get("/answers", answer);
