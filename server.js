"use strict";

const morgan = require("morgan");

const express = require("express");

const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const app = express();

const { songList } = app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/top50", (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50,
  });
});

app.get("/top50/song/:id", (req, res) => {
  const songId = req.params.id;
  // get the song object from the array
  // render singlesong... pass it{ song: songObj}
  res.render("pages/singlesong", {
    title: "Top 50 Songs Streamed on Spotify",
    song: top50[songId - 1],
  });
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
