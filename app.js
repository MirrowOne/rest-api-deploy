/* eslint-disable comma-dangle */
import express, { json } from 'express'

import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()

app.use(json())
app.use(corsMiddleware)
app.disable('x-powered-by') // deshabilitar x powered by: express

//! Rutas
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 10000

app.listen(PORT, () => {
  console.log(`server lintening on port http://localhost:${PORT}`)
})
