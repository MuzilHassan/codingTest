import express, { Router } from "express";
import {
  ISSMCreateFeedback,
  ISSMGetFeedback,
  ISSMUpdateFeedback,
} from "../controller/feedbackController";

const router = express.Router();

router.route("/").post(ISSMCreateFeedback).get(ISSMGetFeedback);
router.route("/:id").patch(ISSMUpdateFeedback).put(ISSMUpdateFeedback);

export default router;
