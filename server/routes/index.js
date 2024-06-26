import express from "express";
import { Pool } from "../models/pool.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const counts = await Pool.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]).exec();

    const statusCounts = {
      allBodiesOfWater: counts.reduce((acc, { count }) => acc + count, 0),
      newBoWCount: counts.find((c) => c._id === "New BoW")?.count || 0,
      receivedCount: counts.find((c) => c._id === "Received")?.count || 0,
      ongoingCount: counts.find((c) => c._id === "Ongoing")?.count || 0,
      improvingCount: counts.find((c) => c._id === "Improving")?.count || 0,
      almostCount: counts.find((c) => c._id === "Almost")?.count || 0,
      closedCount: counts.find((c) => c._id === "Closed")?.count || 0,
      followUp1Count: counts.find((c) => c._id === "Follow-up 1")?.count || 0,
      followUp2Count: counts.find((c) => c._id === "Follow-up 2")?.count || 0,
      noUpdateCount: counts.find((c) => c._id === "No update")?.count || 0,
      weeklyServiceCounts:
        counts.find((c) => c._id === "Weekly service")?.count || 0,
    };

    res.json({ data: statusCounts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
