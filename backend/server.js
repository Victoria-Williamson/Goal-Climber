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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "..", "web", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "web", "build", "index.html"));
  });
}

mongoUtil.connect(() => {
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
});
