DROP TABLE IF EXISTS addMovie;

CREATE TABLE IF NOT EXISTS addMovie(
     id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    poster_path VARCHAR(255),
    overview VARCHAR(10000),
    
)