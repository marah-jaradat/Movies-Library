"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3002;
// const Data = require("package.json");
// we go undefined becausewe insert object as json inside body, so we have to parse data
app.use(express.json());
//Routs

app.get("/", homeHandler);
app.get("/favorite", favHandler);
app.get("/user/:id", idHandler);
app.post("/info", infoHandler);

// Functions
// http://localhost:3000/
function homeHandler(req, res) {
  res.send("Hello there");
  // return res.status(200).send(movie);
}
// http://localhost:3000/favorite
function favHandler(req, res) {
  // http://localhost:3000/favorite?name=marah
  // console.log(req.query) as object, query is a keyword for the request
  return res.status(200).send("Welcome to Favorite Page");
}
// http://localhost:3000/user/:id
// req.params:is part of the req
function idHandler(req, res) {
  console.log(req.params);
  res.send("I'm there");
}
// req.body:is part of the req
function infoHandler(req, res) {
  console.log(req.body);
  res.send("I'm the body");
}

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
