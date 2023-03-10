import { Schema, model } from "mongoose";

const livroSchema = new Schema(
  {
    id: { type: String },
    titulo: { type: String, required: true },
    autor: { type: Schema.Types.ObjectId, ref: 'autores', required: true },
    editora: { type: String, required: true },
    numeroPaginas: { type: Number }
  }
);

const livros = model('livros', livroSchema);

export default livros;