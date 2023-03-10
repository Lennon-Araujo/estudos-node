import livros from "../models/Livro.js";

class LivroController {

  static listarlivros = (req, res) => {
    let { editora } = req.query;

    const query = editora ? {'editora': editora} : null;

    livros.find(query)
      .populate('autor', 'nome')
      .exec((err, livros) => {
        if (livros.length == 0) {
          return res.status(404).send({ message: "Não conseguimos encontrar o livro informado, verifique se os parâmetros estão corretos."});
        }
        res.status(200).json(livros);
      })
  }

  static buscarLivro = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate('autor', 'nome')
      .exec((err, livro) => {
        if (!err) {
          res.status(200).send(livro)
        } else {
          res.status(400).send({ message: `${err.message}: Não conseguimos encontrar o livro informado, verifique se os parâmetros estão corretos.` })
        }
      })
  }

  static buscarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;
    console.log(req.query.editora);

    livros.find({ 'editora': editora })
      .exec((err, livro) => {
        if (!err) {
          res.status(200).send(livro)
        } else {
          res.status(400).send({ message: `${err.message}: Não conseguimos encontrar o livro informado, verifique se os parâmetros estão corretos.` })
        }
      })
  }

  static cadastrarLivro = (req, res) => {
    const livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message}: Não foi possível cadastrar o livro, verifique se os parâmetros estão corretos.` })
      } else {
        res.status(201).send(livro.toJSON())
      }
    })
  }

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err, livro) => {
      if (!err) {
        return res.status(200).send({ message: "Livro atualizado com sucesso." })
      }

      if (!livro) {
        return res.status(404).send({ message: "Item não encontrado, verifique se os parâmetros estão corretos." })
      }

      res.status(400).send({ message: `${err.message}: Não foi possível atualizar o livro, verifique se os parâmetros estão corretos.` })
    })
  }

  static removerLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err, livro) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }

      if (!livro) {
        return res.status(404).send({ message: "Item não encontrado, verifique se os parâmetros estão corretos." })
      }

      res.status(200).send({ message: "Livro removido com sucesso." })
    })
  }
}

export default LivroController;