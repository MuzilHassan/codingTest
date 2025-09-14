import cron from "node-cron";

import Feedback from "../model/feedbackModel";
import Metrics from "../model/metricsModel";

cron.schedule("* * * * *", async () => {
  const stats = await Feedback.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        counts: { $push: "$rating" },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  if (!stats[0]) return;

  stats[0].counts = stats[0].counts.reduce(
    (acc: Record<number, number>, rating: number) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  await Metrics.create(stats[0]);
});
