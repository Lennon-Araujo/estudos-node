import autores from "../models/Autor.js";
import { ObjectId } from "mongoose";

class AutorController {

  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    })
  }

  static buscarAutor = (req, res) => {
    const id = req.params.id;

    autores.findById(id, (err, autor) => {
      if (!err) {
        res.status(200).send(autor)
      } else {
        res.status(400).send({ message: `${err.message}: Não conseguimos encontrar o autor informado, verifique se os parâmetros estão corretos.` })
      }
    })
  }

  static cadastrarAutor = (req, res) => {
    const autor = new autores(req.body);

    autor.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message}: Não foi possível cadastrar o autor, verifique se os parâmetros estão corretos.` })
      } else {
        res.status(201).send(autor.toJSON())
      }
    })
  }

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, { $set: req.body }, (err, autor) => {
      if (!err) {
        return res.status(200).send({ message: "Autor atualizado com sucesso." })
      }
      if (!autor) {
        return res.status(404).send({ message: "Item não encontrado, verifique se os parâmetros estão corretos." })
      }
      res.status(400).send({ message: `${err.message}: Não foi possível atualizar o autor, verifique se os parâmetros estão corretos.` })
    })
  }

  static removerAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err, autor) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }
      if (!autor) {
        return res.status(404).send({ message: "Item não encontrado, verifique se os parâmetros estão corretos." })
      }
      res.status(200).send({ message: "Autor removido com sucesso." })
    })
  }
}

export default AutorController;