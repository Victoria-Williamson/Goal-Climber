const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoUtil = require("./mongoStart.js");

const PORT = process.env.PORT || 5005;

const app = express();
app.set("port", PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Project Home");
});

const AuthAPI = require("./api/auth");
app.use("/auth", AuthAPI);

mongoUtil.connect(() => {
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
});
