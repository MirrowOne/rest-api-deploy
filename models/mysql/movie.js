//* Libreria para manejar MySql es "MySql2"
import mysql from 'mysql2/promise'
// import { queryGenre } from './querys/querysSQL'
import {
  allMoviesQuery,
  filteredByIdQuery,
  filteredMoviesByGenre,
} from './querys/querysSQL.js'

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from './dbconfig.js'

const config = {
  host: DB_HOST,
  user: DB_NAME,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(filteredMoviesByGenre, [
        lowerCaseGenre,
      ])

      if (genres.length === 0) return []

      return genres
    }

    const [movies] = await connection.query(allMoviesQuery)
    return movies
  }

  static async getById({ id }) {
    const [movies] = await connection.query(filteredByIdQuery, [id])
    if (movies.length === 0) return null

    return movies[0]
  }

  /* static async create({ input }) {
    const { title, year, duration, director, rate, poster } = input
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // Envía el error real a logs internos (útil para debug)
      console.error('Error al crear película:', e)
      // Lanza error genérico al cliente
      throw new Error('Error al crear la película')
    }

    const [movies] = await connection.query(
      `SELECT 
        title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
       FROM movie 
       WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }
  */

  // static async delete({ id }) {}

  // static async update({ id, input }) {}
}
