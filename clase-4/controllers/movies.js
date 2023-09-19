import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    // qué es lo que renderiza
    res.json(movies)
  }

  static async getById(req, res) {
    // path-to-regexp
    const { id } = req.params

    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404), json({ mesage: ' Movies not found' })
  }

  static async create(req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      // 422 Unprocessable Entity
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    // Si se crea correctamente se devuelve un status code de 201 y además se devuelve el nuevo item creado
    // Para evitar que se haga una petición con un dato nuevo
    res.status(201).json(newMovie)
  }
  
  static async update(req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updateMovie)
  }

  static async delete(req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
