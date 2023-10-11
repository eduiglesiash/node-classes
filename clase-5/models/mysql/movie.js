import mysql from 'mysql2/promise'


const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll({ genre }) {

    // TODO START - Filtrar por genero. 
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      // If no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // Get all movies ids from database table 
      // Query to movie_genres
      // Join
      // Return result


      // TODO END
      return []
    }
    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies')
    return movies
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movies WHERE id = UUID_TO_BIN(?);`, [id])

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // todo: Crear la conexión del genre

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);`,
        [uuid, title, year, director, duration, poster, rate]
      )

    } catch (e) {
      // hay que tener cuidado cuando se controlen este tipo de mensajes porque pueden enviarle
      // información sensible al usuario
      throw new Error('Error creating movie')
      // Lo que podemos hacer es enviar la traza a un servicio interno nuestro 
      // beaconError(e)
    }


    const [movies] = await connection.query(`
    SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
    FROM movies
    WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )
    return movies[0]
  }

  static async delete({ id }) {
    // Todo: Crear el delete 
  }

  static async update({ id, input }) {
    // todo: crear el update 
  }
}
