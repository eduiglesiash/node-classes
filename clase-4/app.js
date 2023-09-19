import express, { json as _json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddelware } from './middlewares/cors.js'


const app = express()
app.disable('x-powered-by')
app.use(_json())
app.use(corsMiddelware())

app.use('/movies', moviesRouter)

// Los recursos que sean MOVIES se indentifica con /movies

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

/* 
IDEMPOTENCIA: 
Propiedad de realizar una acción determinada varias veces y aún así consguier siempre el mismo resutlado que obterndría al hacerlo una vez.

POST => Crear un nuevo elemento en el servidor
PUT => Actualizar totalmente un elemento ya exsistente o crearlo si no existe 
PATCH => Actualizar parcialmente un elemento/recurso

*/
