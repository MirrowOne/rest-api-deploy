/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().min(0).max(300), // 300 minutos = 5 horas
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
      'Crime',
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre',
    }
  ),
})

export function validateMovie(object) {
  return movieSchema.safeParse(object)
}

// parse no hace que sea un requisito todos los campos
// pero si existe un campo lo valida correctamente
export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
