import mongoose from "mongoose";
import { enderecoSchema } from "./Endereco.js";

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false },
  telefones: { type: Array, default: [] },
  dataNascimento: { type: Date },
  endereco: enderecoSchema
}, { versionKey: false });

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
