DROP TABLE IF EXISTS addMovie;

CREATE TABLE IF NOT EXISTS addMovie(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    readInMainutes INTEGER,
    summary VARCHAR(10000),
    vegetarian BOOLEAN,
    instructions VARCHAR(10000),
    sourceUrl VARCHAR(255),
    image VARCHAR(255),
    comment VARCHAR(1000)
    
    
)