// import movies from './movies.json' assert { type: 'json' } // <== Esta sintaxis no existe
// import movies from './movies.json' with { type: 'json' } // <== Todavía no está soportada aunque es la correcta

// Mientras podemos usar esta forma de importar JSON en NODE con ESM Modules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))


// Como leer un json en ESModules recomendado por ahora
import { createRequire } from 'node:module'
// Creamos un método require para hacer la importación de los JSON, aunque lo podemos usar para más cosas. 
const require = createRequire(import.meta.url) // <== import.meta.url contiene información del archivo
export const readJSON = (path) => require(path)
