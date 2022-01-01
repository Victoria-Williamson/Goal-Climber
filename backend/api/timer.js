const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const request = require("request");
const mongoUtil = require("../mongoStart");
const { ObjectId } = require("mongodb");

// Create Timer
router.post(
  "/create",
  body("uid").isString(),
  body("title").isString(),
  body("color").isString(),
  body("timers").isArray(),
  function (req, res) {
    db = mongoUtil.get();
    db.db("project")
      .collection("timers")
      .insertOne(req.body, function (err, result) {
        if (err) {
          res.status(400).send(JSON.stringify({ error: err }));
        } else {
          res.status(200).send(JSON.stringify({ success: "timer creater" }));
        }
      });
  }
);

// Load Timer
router.get("/:_id", function (req, res) {
  if (req.params._id === null || req.params._id === undefined) {
    res
      .status(400)
      .send(JSON.stringify({ error: "Error Connecting to database" }));
    return;
  }
  db = mongoUtil.get();
  db.db("project")
    .collection("timers")
    .findOne({ _id: ObjectId(req.params._id) }, function (err, result) {
      if (err) {
        res.status(400).send(JSON.stringify({ error: err }));
      } else {
        res.status(200).send(result);
      }
    });
});

// Load all User Timers
router.get("/all/:uid", function (req, res) {
  if (req.params.uid === null || req.params.uid === undefined) {
    res
      .status(400)
      .send(JSON.stringify({ error: "Error Connecting to database" }));
    return;
  }
  db = mongoUtil.get();
  db.db("project")
    .collection("timers")
    .find({
      uid: req.params.uid,
    })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send(JSON.stringify({ error: err }));
      } else {
        res.status(200).send(result);
      }
    });
});

// Edit Timer
router.put(
  "/edit",
  body("_id").isString(),
  body("update").isObject(),
  function (req, res) {
    db = mongoUtil.get();
    db.db("project")
      .collection("timers")
      .updateOne(
        { _id: ObjectId(req.body._id) },
        { $set: req.body.update },
        function (err, result) {
          if (err) {
            res.status(400).send(JSON.stringify({ error: err }));
          } else {
            res.status(200).send({ success: "timer edited" });
          }
        }
      );
  }
);

// Delete Timer
router.delete("/delete/:_id", function (req, res) {
  if (req.params._id === null || req.params._id === undefined) {
    res
      .status(400)
      .send(JSON.stringify({ error: "Error Connecting to database" }));
    return;
  }
  db = mongoUtil.get();
  db.db("project")
    .collection("timers")
    .deleteOne({ _id: ObjectId(req.params._id) }, function (err) {
      if (err) {
        res.status(400).send(JSON.stringify({ error: err }));
      } else {
        res.status(200).send(JSON.stringify({ success: "timer deleted" }));
      }
    });
});

module.exports = router;
