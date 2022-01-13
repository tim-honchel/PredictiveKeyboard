const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "public/index.html"));
  } catch (error) {
    next(error);
  }
});

app.post("/api/predictive", (req, res, next) => {
  try {
    let query = req.body.query;

    fs.readFile(
      path.join(__dirname, "./resources/dictionary.txt"),
      (err, contents) => {
        if (err) next(err);

        let wordList = contents.toString().split("\r\n");

        console.log(wordList);

        let shortList = wordList.filter((word) => word.startsWith(query.toLowerCase()));

        res.json({ count: shortList.length, shortList, query });
      }
    );
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    name: err.name || "Unknown error",
    msg: err.message || "An unexpected error occurred",
  });
});

app.listen(3000, () => console.log("Server listening on port 3000..."));
