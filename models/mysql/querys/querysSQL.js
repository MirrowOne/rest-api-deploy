export const allMoviesQuery = `
    SELECT 
    title, 
    year,
    director, 
    duration, 
    poster, 
    rate, 
    BIN_TO_UUID(id) FROM movie
`

export const filteredMoviesByGenre = `
  SELECT 
    BIN_TO_UUID(a.id) AS id, 
    title, 
    year, 
    director, 
    duration, 
    poster, 
    rate, 
    b.genre_id, 
    c.name 
  FROM movie a
  INNER JOIN movie_genres b ON a.id = b.movie_id
  INNER JOIN genre c ON b.genre_id = c.id 
  WHERE c.name = ?
`

export const filteredByIdQuery = `
    SELECT 
    title,
    year, 
    director, 
    duration, 
    poster, 
    rate, 
    BIN_TO_UUID(id) 
    FROM movie WHERE ID = UUID_TO_BIN(?);
`

//BIN_TO_UUID(a.id)
