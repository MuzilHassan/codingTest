import { Request, Response } from "express";
import Feedback from "../model/feedbackModel";

export const ISSMCreateFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({
      status: "success",
      data: { feedback },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Something went wrong while creating feedback",
    });
  }
};

export const ISSMGetFeedback = async (req: Request, res: Response) => {
  try {
    const query = { ...req.query };
    const excludedFeilds = ["page", "limit"];

    excludedFeilds.forEach((item) => delete query[item]);
    if (query.name) {
      query.name = { $regex: query.name, $options: "i" };
    }
    let dbQuery = Feedback.find(query);
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;
    let total = 0;
    dbQuery = dbQuery.skip(skip).limit(limit);
    total = await Feedback.countDocuments(query);
    if (skip >= total)
      return res.status(400).json({
        status: "error",
        message: "No more pages",
      });

    const feedbacks = await dbQuery;
    res.status(200).json({
      status: "success",

      data: {
        feedbacks,
        page,
        limit,
        total,
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Something went wrong while getting feedbacks",
    });
  }
};

export const ISSMUpdateFeedback = async (req: Request, res: Response) => {
  try {
    const feedback =
      req.method == "PUT"
        ? await Feedback.findOneAndReplace({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
          })
        : await Feedback.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
    if (!feedback) {
      return res.status(200).json({
        status: "error",
        message: "No feedback was found for this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: { feedback },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Something went wrong while getting feedbacks",
    });
  }
};
