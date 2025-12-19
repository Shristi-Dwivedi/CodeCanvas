const express = require("express");
const router = express.Router();
const TestHistory = require("../models/TestHistory");
const mongoose = require("mongoose");

router.get("/leaderboard", async (req, res) => {
  try {
    const result = await TestHistory.aggregate([
      { $unwind: "$questions" },

      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$questions.score" },
          grade: { $first: "$grade" },
        }
      },
      {
        $lookup: {
          from: "users",
          let: { userObjId: { $toObjectId: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userObjId"] }
              }
            }
          ],
          as: "user"
        }
      },

      { $unwind: "$user" },

      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          totalScore: 1,
          grade: 1
        }
      },

      { $sort: { totalScore: -1 } }
    ]);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
