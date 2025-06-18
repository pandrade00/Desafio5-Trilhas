import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefone: { type: String },
  dataNascimento: { type: Date },
}, { versionKey: false });

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
