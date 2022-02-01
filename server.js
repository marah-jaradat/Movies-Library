"use strict";

//
const express = require("express");
const app = express();

const Data = require("./Movie data/data.json");
// const PORT = 4012;

const axios = require("axios");

const dotenv = require("dotenv");

dotenv.config();
const APIKEY = process.env.APIKEY;
const PORT = process.env.PORT;
//
app.get("/", getMovieHandler);

// app.get("/favorite", function (req, res) {
//   return res.status(200).send("Welcome to Favorite Page");
// });

app.get("/favorite", getFavoriteHandler);

app.get("/trending", getTrendingHandler);

app.get("/search", getSearchHandler);

app.use(errorHandler);

app.use("*", notFountHandler);

// Constructor
function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

//

function getMovieHandler(req, res) {
  let movies = [];
  axios
    .get(
      `https://api.themoviedb.org/3/movie/{movie_id}?${APIKEY}=<<api_key>>&language=en-US`
    )
    .then((value) => {
      value.data.movies.forEach((movie) => {
        let oneMovie = new Movie(
          movie.title,
          movie.poster_path,
          movie.overview
        );
        movies.push(oneMovie);
      });
      return res.status(200).json(movies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function getFavoriteHandler(req, res) {
  let favoriteQuery = req.query.favorite;

  let movies = [];

  axios
    .get(
      "https://api.themoviedb.org/3/movie/favorite/343611?api_key={APIKEY}&append_to_response=videos"
    )
    .then((value) => {
      value.data.results.forEach((movie) => {
        movies.push(movie);
      });

      return res.status(200).json(movies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function getTrendingHandler(req, res) {
  let trendingQuery = req.query.trending;

  let movies = [];

  axios
    .get("https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>")
    .then((value) => {
      value.data.results.forEach((movie) => {
        movies.push(movie);
      });

      return res.status(200).json(movies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function getSearchHandler(req, res) {
  let searchQuery = req.query.search;

  let movies = [];

  axios
    .get(
      "https://api.themoviedb.org/3/search/company?api_key=<<api_key>>&page=1"
    )
    .then((value) => {
      value.data.results.forEach((movie) => {
        movies.push(movie);
      });

      return res.status(200).json(movies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function notFountHandler(req, res) {
  res.status(404).send("No endpoint with this name");
}

function errorHandler(error, req, res) {
  const err = {
    status: 500,
    message: error,
  };

  res.status(500).send(err);
}

app.listen(PORT, () => console.log(`server is listening to ${PORT}`));
