import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:1234',
  'https://movies.com',
  'https://mirrowapi.org',
  'https://rest-api-deploy-7kwk.onrender.com',
]

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
