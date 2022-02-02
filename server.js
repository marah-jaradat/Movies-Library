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

app.get("/favorite", getFavoriteHandler);

app.get("/trending", getTrendingHandler);

app.get("/search", getSearchHandler);

app.get("/search/company", getSearchCompanyHandler);

app.get("/watch/providers/regions", getWatchHandler);

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
      "https://api.themoviedb.org/3/movie/550?api_key=44bca49a3851cf70a7904aeed9847745"
    )
    .then((value) => {
      value.data.movies.forEach((movie) => {
        let oneMovie = new Movie(
          movie.data.title,
          movie.data.poster_path,
          movie.data.overview
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
      `https://api.themoviedb.org/3/movie/favorite/343611?api_key=${APIKEY}&append_to_response=videos`
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
    .get(`https://api.themoviedb.org/3/movie/trending/all/day?api_key${APIKEY}`)
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
    .get(`https://api.themoviedb.org/3/search/movie${APIKEY}&page=1`)
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

function getSearchCompanyHandler(req, res) {
  let companyhQuery = req.query.company;

  let movies = [];

  axios
    .get(`https://api.themoviedb.org/3/search/company?api_key=${APIKEY}&page=1`)
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

function getWatchHandler(req, res) {
  let watchQuery = req.query.watch;

  let movies = [];

  axios
    .get(
      `https://api.themoviedb.org/3/watch/providers/regions?api_key=${APIKEY}`
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
