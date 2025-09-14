import express from "express";
import { ISSMGetMetrics } from "../controller/metricsController";

const router = express.Router();

router.route("/").get(ISSMGetMetrics);

export default router;
