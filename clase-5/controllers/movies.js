import { validateMovie, validatePartialMovie } from '../schemas/movies.js'


/* 
  Los métodos estáticos significa que puedes usarlos sin necesidad de crear una instacia de la clase

*/
export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }


  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    // qué es lo que renderiza
    res.json(movies)
  }

  getById = async (req, res) => {
    // path-to-regexp
    const { id } = req.params

    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404), json({ mesage: ' Movies not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      // 422 Unprocessable Entity
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await this.movieModel.create({ input: result.data })

    // Si se crea correctamente se devuelve un status code de 201 y además se devuelve el nuevo item creado
    // Para evitar que se haga una petición con un dato nuevo
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updateMovie = await this.movieModel.update({ id, input: result.data })

    return res.json(updateMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.movieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}