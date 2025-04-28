/* eslint-disable comma-dangle */
const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/schemas')

const app = express()

app.use(express.json())
// app.use(cors()) // por defecto pone a todo *
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:1234',
        'https://movies.com',
        // eslint-disable-next-line comma-dangle
        'https://mirrowapi.org',
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
      // eslint-disable-next-line comma-dangle
    },
  })
)
app.disable('x-powered-by') // deshabilitar x powered by: express

// . Todos los recursos que sea MOVIES se identifica con /movides
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})
// Recuperamos movies por id
app.get('/movies/:id', (req, res) => {
  // path-to-regexp
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // Esto no seria REST, porque estamos guadando el
  // estado de la aplicacion en memoria

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (!movieIndex < 0) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server lintening on port http://localhost:${PORT}`)
})
