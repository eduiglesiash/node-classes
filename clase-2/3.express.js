const express = require('express')
// commonJS => modulos clasicos de node 
const dittoJson = require('./pokemon/ditto.json')
const app = express()
const PORT = process.env.PORT ?? 1122

app.disable('x-powered-by')


app.use(express.json())
// Este middelware es lo mismo que express.json()

// app.use((req, res, next) => {

//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // Solo llegan request que son POST y que tienen el header Contetn-Type: application/json

//   let body = ''
//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutar la request y meter la información en el req.body
//     req.body = data
//     // importante para el que middelware se quede bloqueado
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  return res.end(JSON.stringify(dittoJson))
})


app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// Esta hay que tenerla la final de todas las request
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})


app.listen(PORT, () => {
  console.log(`Server ready on port http://localhost:${PORT}`)
})