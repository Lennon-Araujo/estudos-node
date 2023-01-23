import { Schema, model } from "mongoose";

const livroSchema = new Schema(
  {
    id: { type: String },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editor: { type: String, required: true },
    numeroPaginas: { type: Number }
  }
);

const livros = model('livros', livroSchema);

export default livros;