/* eslint-disable comma-dangle */
import express, { json } from 'express'

import { moviesRouter } from './routes/movies'
import { corsMiddleware } from './middleware/cors'

const app = express()

app.use(json())
app.use(corsMiddleware)
app.disable('x-powered-by') // deshabilitar x powered by: express

//! Rutas
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server lintening on port http://localhost:${PORT}`)
})
