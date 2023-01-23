import app from './src/app.js'

const port = process.env.PORT || 3000;


// Forma feita sem o uso do Express - usando http direto do node

// const rotas = {
//   '/': 'Curso de node',
//   '/livros': 'Página de livros',
//   '/autores': 'Lista de autores',
//   '/editor': 'Editor'
// }

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'})
//   res.end(rotas[req.url]);
// })

// server.listen(port, () => {
//   console.log(`Servidor escutando em http://localhost:${port}`);
// })

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
})