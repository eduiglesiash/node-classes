const http = require('node:http') // Protocolo http

const desiredPort = process.env.PORT ?? 1234


const processRequest = (req, res)=>{
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  if (req.url === '/'){
    res.statusCode = 200 // ok
    res.end('<h1>Bienvenido a mi página de incio</h1>')
  } else if(req.url === '/contacto' ){
    res.statusCode = 200;
    res.end('<h1> Contacto </h1>')
  } else {
    res.statusCode = 404 // not found
    res.end('<h1>404</h1>')
  }
}


const server = http.createServer(processRequest)

server.listen(desiredPort, ()=>{
  console.log(`server listening on port http://localhost:${desiredPort}`)
})