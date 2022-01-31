"use strict";

//
const express = require("express");
const app = express();

const Data = require("./data.json");
const PORT = 4012;

//
app.get("/", function (req, res) {
  return res.status(200).send(movie);
});

app.get("/favorite", function (req, res) {
  return res.status(200).send("Welcome to Favorite Page");
});

// Constructor
function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

//

const movie = new Movie(
  "Spider-Man: No Way Home",
  "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
);

app.listen(PORT, () => console.log("server is listening "));
