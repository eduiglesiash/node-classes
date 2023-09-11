/* 
Status code 

  100 - 199: Respuestas informativas
  200 - 299: Respuestas satisfactorias
  300 - 399: Redirecciones
  400 - 499: Errores de cliente
  500 - 599: Errores del servidor

  http.cat => Todos los status code explicados
*/


const http = require('node:http') // Protocolo http
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234


const processRequest = (req, res) => {
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200  // ok
    res.end('<h1>Bienvenido a mi página de incio</h1>')
  } else if (req.url === '/paisaje.webp') {
    fs.readFile('./paisaje.webp', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> 500 Internal Server Error </h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/webp')
        res.end(data)
      }
    })

  } else if (req.url === '/contacto') {
    res.statusCode = 200; // ok ∫
    res.end('<h1> Contacto </h1>')
  } else {
    res.statusCode = 404 // not found
    res.end('<h1>404</h1>')
  }
}


const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})

