import { Request, Response } from "express";
import Metrics from "../model/metricsModel";

export const ISSMGetMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await Metrics.find().limit(1);
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Something went wrong while creating feedback",
    });
  }
};
