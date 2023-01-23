import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
  console.log('MongoDB Conectado.')
})

const app = express();

app.use(express.json())

routes(app);

app.get('/livros/:id', (req, res) => {
  const livroEscolhido = buscaPorId(req.params.id);
  res.status(200).json(livroEscolhido);
})

app.post('/livros', (req, res) => {
  console.log(req.body);
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso.");
})

app.put('/livros/:id', (req, res) => {
  const livroEscolhido = buscaPorId(req.params.id);
  if (!livroEscolhido) {
    res.status(404).send(`Livro não encontrado. Verifique se o ID informado está correto.`)
  } else {
    const oldLivro = livroEscolhido.titulo;
    livroEscolhido.titulo = req.body.titulo;
    res.status(200).send(`Livro ${oldLivro} atualizado para ${livroEscolhido.titulo} com sucesso.`);
  }

})

app.delete('/livros/:id', (req, res) => {
  const livroDeletado = buscaPorId(req.params.id);
  if (!livroDeletado) {
    res.status(404).send(`Livro não encontrado. Verifique se o ID informado está correto.`)
  } else {
    livros.splice(livros.findIndex(livro => livro.id == req.params.id), 1);
    res.status(200).send(`Livro ${livroDeletado.titulo} deletado com sucesso.`);
  }
})

function buscaPorId(id) {
  const indexLivro = livros.findIndex(livro => livro.id == id)
  if (indexLivro == -1) {
    return false;
  }
  return livros[indexLivro]
}

export default app;