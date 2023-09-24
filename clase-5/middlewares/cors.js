import cors from 'cors'
// Métodos normales: GET/HEAD/POST
// Métodos Complejos: PUT/PATCH/DELETE

// Cors PRE-FLIGHT
// OPTIONS
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:1234', 'https://movies.com']
export const corsMiddelware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
}
